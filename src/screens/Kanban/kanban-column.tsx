import {useTasks} from "../../utils/task";
import {Kanban} from "../../types/kanban";
import {useKanbansQueryKey, useTasksModal, useTasksSearchParams} from "./util";
import {useTaskTypes} from "../../utils/task-type";
import taskIcon from '../../assets/task.svg'
import bugIcon from '../../assets/bug.svg'
import styled from "@emotion/styled";
import {Button, Card, Dropdown, Modal} from "antd";
import {CreateTask} from "./create-task";
import {Task} from "../../types/task";
import {Mark} from "../../components/mark";
import {useDeleteKanban} from "../../utils/kanban";
import {Row} from "../../components/lib";
import {MenuProps} from "antd/es/menu";
import React from "react";
// 获取taskType的列表根据id渲染对应的图片
const TaskTypeIcon = ({id}: { id: number }) => {
    const {data: taskTypes} = useTaskTypes()
    // name === id对应的taskType 的name
    const name = taskTypes?.find(taskType => taskType.id === id)?.name
    // 如果没有name
    if (!name) return null
    return <img alt={'icon'} src={name === 'task' ? taskIcon : bugIcon} style={{width: '1.6rem'}}/>

}

// 抽离card
const TaskCard = ({task}: { task: Task }) => {
    // 点击卡片
    const {startEdit} = useTasksModal()
    // 从url读取keyword
    const {name: keyword} = useTasksSearchParams()

    return (
        <Card onClick={() => startEdit(task.id)} style={{marginBottom: '0.5rem', cursor: 'pointer'}} key={task.id}>
            <div>
                <Mark name={task.name} keyword={keyword}/>
            </div>
            {/*图标*/}
            <TaskTypeIcon id={task.typeId}/>
        </Card>
    )
}

// 删除组件
const More = ({kanban}: { kanban: Kanban }) => {
    const {mutateAsync} = useDeleteKanban(useKanbansQueryKey())
    const startEdit = () => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除看板吗',
            onOk() {
                return mutateAsync({id: kanban.id})
            }
        })
    }
    // 当版本< 4.24.0 可用
    // const overlay = (
    //     <Menu>
    //         <Menu.Item key={'1'}>
    //             <Button type={'link'} onClick={startEdit}>删除</Button>
    //         </Menu.Item>
    //     </Menu>
    // )
    // https://ant.design/components/dropdown-cn/
    // 定义menu 最新版本需要使用menu // >=4.24.0 可用，推荐的写法
    const items = [
        {label: '删除', key: 'item-1'}, // 菜单项务必填写 key
    ];
    // 定义点击item项触发的事件 删除操作
    const onClick: MenuProps['onClick'] = ({key}) => {
        startEdit()
    };
    return (
        <Dropdown menu={{items, onClick}}>
            <Button type={'link'}>...</Button>
        </Dropdown>
    )
}


// 看板每一列的组件  任务
export const KanbanColumn = React.forwardRef<HTMLDivElement, { kanban: Kanban }>(({kanban, ...props}, ref) => {
    const {data: allTasks} = useTasks(useTasksSearchParams())
    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)


    return (
        <Container {...props} ref={ref}>
            <Row between={true}>
                <h3>{kanban.name}</h3>
                <More key={kanban.id} kanban={kanban}/>
            </Row>
            {/*每一个task*/}
            <TaskContainer>
                {
                    tasks?.map(task => (
                        <TaskCard key={task.id} task={task}/>
                    ))
                }
                {/*创建新的任务*/}
                <CreateTask kanbanId={kanban.id}/>
            </TaskContainer>
        </Container>
    )

})

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`

const TaskContainer = styled.div`
  // 滚动
  overflow: scroll;
  flex: 1;
  // 清除滚动条
  ::-webkit-scrollbar {
    display: none;
  }
`