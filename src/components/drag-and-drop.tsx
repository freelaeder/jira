import React, {ReactNode} from 'react'
import {
    Draggable,
    DraggableProps,
    Droppable,
    DroppableProps,
    DroppableProvided,
    DroppableProvidedProps
} from 'react-beautiful-dnd'

// 我们需要的children 是 reactNode 删除原有的 ,替换我们自己的
type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode }

// 可放置的位置
export const Drop = ({children, ...props}: DropProps) => {
    return (
        <Droppable {...props}>
            {
                //遵循 drop api 返回函数
                provided => {
                    if (React.isValidElement(children)) {
                        //克隆传递的子元素 添加 props

                        return React.cloneElement(children, {
                            ...provided.droppableProps,
                            // @ts-ignore
                            ref: provided.innerRef,
                            provided
                        })
                    } else {
                        return <div/>
                    }
                }
            }
        </Droppable>
    )
}

type DropChildProps =
    Partial<{ provided: DroppableProvided } & DroppableProvidedProps>
    & React.HtmlHTMLAttributes<HTMLDivElement>

export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(({children, ...props}, ref) => {
    return (
        <div ref={ref} {...props}>
            {children}
            {props.provided?.placeholder}
        </div>
    )
})

type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode }


// 可拖拽的每一项
export const Drag = ({children, ...props}: DragProps) => {
    return (
        <Draggable {...props}>
            {
                provided => {
                    if (React.isValidElement(children)) {
                        return React.cloneElement(children, {
                            ...provided.draggableProps,
                            ...provided.dragHandleProps,
                            // @ts-ignore
                            ref: provided.innerRef,
                        })
                    } else {
                        return <div/>
                    }
                }
            }
        </Draggable>
    )
}