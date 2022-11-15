// 在一个函数中 改变传入的对象 本身是不好的
// 排除value 为 0 的情况
// !! 把一个值 转化为 boolean值
import {useEffect, useRef, useState} from "react";

export const isFasy = (value: unknown) => value === 0 ? false : !value
// cleanObject 会清空 value 为空的 key 返回新的 对象
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''
export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        // 属性值
        // console.log(key,'key-----')
        // console.log(result[key],'value---')
        const value = result[key]
        // 如果 这个value 不存在 删除
        // 不排除 0
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result
}

// custom Hook

/**
 * 定义custom hook时名字必须以use开头，
 * 否则eslint会报错，因为不管是自己定义的hook还是react自带的hook
 * 都只能在组件中或其他hook中运行
 * deps:[] 只在挂载销毁执行一次
 * 。 */
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
        // todo 依赖项里加上callback 会造成无限循环 useCallback 以及 useMount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

// debounce 减少请求次数
// export const debounce = (func,delay) => {
//     // 定义timer
//     let timer;
//     return () => {
//         // 如果timer 存在 删除上一次定时器
//         if(timer) return
//         timer = setTimeout(()=>{
//             func()
//         },delay)
//     }
// }

export const useDebounce = <V>(value: V, delay = 500) => {
    const [debounceValue, setDebounce] = useState(value)
    useEffect(() => {
        // 每次在value变化后 设置一个定时器
        const timerout = setTimeout(() => setDebounce(value), delay)
        // 在上一个useEffect 执行完之后执行
        return () => clearTimeout(timerout)
    }, [value, delay])
    return debounceValue
}

// const useArray = <T>(initialArray:T[]) =>{
//     const [value,setValue] = useState(initialArray)
//     return {
//         value,
//         setValue,
//         add:(item:T) => setValue([...value,item]),
//         clear:() =>setValue([]),
//         removeIndex:(index:number) => {
//             const copy = [...value]
//             copy.splice(index,1)
//             setValue(copy)
//
//         }
//     }
// }


// 改变当前页面的title
// keeponUnmount true 保留title  false 不保留
export const useDocumentTitle = (title: string, keeponUnmount = true) => {
    // 页面加载后 oldTitle === 旧 'react app'
    // 加载后 oldTitle ===  新 用户传递的title、
    // 记录页面刚加载的title
    // 返回的 ref 对象在组件的整个生命周期内持续存在。
    const oldTitle = useRef(document.title).current
    useEffect(() => {
        document.title = title
    }, [title])
    // 页面卸载
    useEffect(() => {
        //页面卸载时调用
        return () => {
            if (!keeponUnmount) {
                // 如果不添加依赖 oldTitle 永远是第一次加载时的title
                document.title = oldTitle
            }
        }

    }, [oldTitle, keeponUnmount])
}
// 重置路由跳转 并且刷新
export const resetRoute = () => window.location.href = window.location.origin

//返回组件的挂载状态， 如果没有挂载，或者已经卸载，返回false 反之 true

export const useMountedRef = () => {
    // 默认的挂载状态
    const mountedRef = useRef(false)
    // 页面渲染时
    useEffect(() => {
        // 修改挂载状态
        mountedRef.current = true
        // 页面卸载时
        return () => {
            mountedRef.current = false
        }
    })
    // 返回 mountedRef
    return mountedRef
}