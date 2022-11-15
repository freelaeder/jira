import {useTasks} from "../../utils/task";
import {Kanban} from "../../types/kanban";
import {useTasksSearchParams} from "./util";
import {useTaskTypes} from "../../utils/task-type";
import taskIcon from '../../assets/task.svg'
import bugIcon from '../../assets/bug.svg'
import styled from "@emotion/styled";
import {Card} from "antd";
// 获取taskType的列表根据id渲染对应的图片
const TaskTypeIcon = ({id}: { id: number }) => {
    const {data: taskTypes} = useTaskTypes()
    // name === id对应的taskType 的name
    const name = taskTypes?.find(taskType => taskType.id === id)?.name
    // 如果没有name
    if (!name) return null
    return <img src={name === 'task' ? taskIcon : bugIcon} style={{width: '1.6rem'}}/>

}


// 看板每一列的组件
export const KanbanColumn = ({kanban}: { kanban: Kanban }) => {
    const {data: allTasks} = useTasks(useTasksSearchParams())
    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)
    return (
        <Container>
            <h3>{kanban.name}</h3>
            <TaskContainer>
                {
                    tasks?.map(task => (
                        <Card style={{marginBottom: '0.5rem'}} key={task.id}>
                            <div>
                                {task.name}
                            </div>
                            {/*图标*/}
                            <TaskTypeIcon id={task.typeId}/>
                        </Card>
                    ))
                }
            </TaskContainer>
        </Container>
    )

}

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`