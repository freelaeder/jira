import React, {useCallback} from 'react';
import {useDocumentTitle} from "../../utils";
import {
    useKanbanSearchParams,
    useKanbansQueryKey,
    useProjectInUrl,
    useTasksQueryKey,
    useTasksSearchParams
} from "./util";
import {useKanbans, useReorderKanban} from "../../utils/kanban";
import {KanbanColumn} from "./kanban-column";
import styled from "@emotion/styled";
import {SearchPanel} from "./search-panel";
import {ScreenContainer} from "../../components/lib";
import {useReorderTask, useTasks} from "../../utils/task";
import {message, Spin} from "antd";
import {CreateKanban} from "./create-kanban";
import {TaskModal} from "./task-modal";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {Drag, Drop, DropChild} from "../../components/drag-and-drop";

const KanBanScreen = () => {
    // 指定标题
    useDocumentTitle('看板列表', false)
    // 获取kanban数据
    const {data: currentProject} = useProjectInUrl()
    console.log(currentProject,'currentProject')
    const {data: kanbans = [], isLoading: kanbanIsLoading} = useKanbans(useKanbanSearchParams())
    // 任务loading
    const {isLoading: taskIsLoading} = useTasks(useTasksSearchParams())
    // 真正的loading
    const isLoading = kanbanIsLoading || taskIsLoading
    // 拖拽之后的行为
    const onDragEnd = useDragEnd()
    return (
        // <div style={{overflow: "auto", display: 'flex'}}>
            // onDragEnd 结束的时候 持久化
            <DragDropContext onDragEnd={onDragEnd()}>
                <ScreenContainer>
                    <h1>{currentProject?.name}看板</h1>
                    {/*搜索框*/}
                    <SearchPanel/>
                    {/*  判断是不是loading*/}
                    {
                        isLoading ? <Spin size={'large'}/> : (
                            <ColumnsContainer>
                                {/*// Droppable 可放置的地方 direction={'horizontal'} 水平方向 vertical 垂直*/}
                                <Drop type={'COLUMN'} direction={'horizontal'} droppableId={'kanban'}>
                                    <DropChild style={{display: 'flex'}}>
                                        {
                                            kanbans?.map((kanban, index) => (
                                                // Draggable 可拖拽的每一项
                                                <Drag key={kanban.id} draggableId={'kanban' + kanban.id} index={index}>
                                                    <KanbanColumn kanban={kanban} key={kanban.id}/>
                                                </Drag>
                                            ))
                                        }
                                    </DropChild>
                                </Drop>
                                {/*创建看板*/}
                                <CreateKanban/>
                            </ColumnsContainer>
                        )
                    }
                    {/*    编辑task*/}
                    <TaskModal/>
                </ScreenContainer>
            </DragDropContext>
        // {/*</div>*/}

    );
};

export default KanBanScreen;

// 拖拽之后的行为
export const useDragEnd = () => {
    const {data: kanbans} = useKanbans(useKanbanSearchParams())
    // 使用拖拽api kanban
    const {mutate: reorderKanban} = useReorderKanban(useKanbansQueryKey())
    // 使用拖拽api task
    const {mutate: reorderTask} = useReorderTask(useTasksQueryKey())
    // 获取task
    const {data: allTasks = []} = useTasks(useTasksSearchParams())
    // source 提起来的组件, destination 目标位置, type 类型
    return useCallback(() => ({source, destination, type}: DropResult) => {
        //如果没有排序
        if (!destination) {
            return
        }
        // 如果是看板排序 COLUMN
        if (type === 'COLUMN') {
            // fromId 提起来的看板id
            const fromId = kanbans?.[source.index].id
            // 目标位置
            const toId = kanbans?.[destination.index].id
            // 如果没有
            if (!fromId || !toId || fromId === toId) {

                return;
            }
            const type = destination.index > source.index ? "after" : "before";

            reorderKanban({fromId, referenceId: toId, type});

        }
        if (type === 'ROW') {
            // source 提起来的组件, destination 目标位置, type 类型
            const fromKanbanId = +source.droppableId
            const toKanbanId = +destination.droppableId
            // 如果发生拖拽 但是位置没有改变
            if (fromKanbanId === toKanbanId) {
                message.info({content: '好像什么都没有发生哦'}).then()
                return;
            }
            // 获取拖拽的task source.index在这个看板里 拖拽的task是第几个
            const fromTask = allTasks.filter(task => task.kanbanId === fromKanbanId)[source.index]
            // 获取拖拽之后目的地
            const toTask = allTasks.filter(task => task.kanbanId === toKanbanId)[destination.index]
            // 如果拖拽一样
            if (fromTask?.id === toTask?.id) {

                return;
            }
            // 发生请求
            reorderTask({
                fromId: fromTask?.id,
                referenceId: toTask?.id,
                fromKanbanId,
                toKanbanId,
                type: fromKanbanId === toKanbanId && destination.index > source.index ? 'after' : 'before'
            })


        }

    }, [kanbans, reorderKanban, allTasks, reorderTask])
}

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  // 侵占父亲剩余的空间
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`