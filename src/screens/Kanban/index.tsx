import React from 'react';
import {useDocumentTitle} from "../../utils";
import {useKanbanSearchParams, useProjectInUrl, useTasksSearchParams} from "./util";
import {useKanbans} from "../../utils/kanban";
import {KanbanColumn} from "./kanban-column";
import styled from "@emotion/styled";
import {SearchPanel} from "./search-panel";
import {ScreenContainer} from "../../components/lib";
import {useTasks} from "../../utils/task";
import {Spin} from "antd";
import {CreateKanban} from "./create-kanban";
import {TaskModal} from "./task-modal";
import {DragDropContext} from "react-beautiful-dnd";
import {Drag, Drop, DropChild} from "../../components/drag-and-drop";

const KanBanScreen = () => {
    // 指定标题
    useDocumentTitle('看板列表', false)
    // 获取kanban数据
    const {data: currentProject} = useProjectInUrl()
    const {data: kanbans = [], isLoading: kanbanIsLoading} = useKanbans(useKanbanSearchParams())
    // 任务loading
    const {isLoading: taskIsLoading} = useTasks(useTasksSearchParams())
    // 真正的loading
    const isLoading = kanbanIsLoading || taskIsLoading
    return (
        // onDragEnd 结束的时候 持久化
        <DragDropContext onDragEnd={() => {
        }}>
            <ScreenContainer>
                <h1>{currentProject?.name}</h1>
                {/*搜索框*/}
                <SearchPanel/>
                {/*  判断是不是loading*/}
                {
                    isLoading ? <Spin size={'large'}/> : (
                        // Droppable 可放置的地方 direction={'horizontal'} 水平方向 vertical 垂直
                        <Drop type={'COLUMN'} direction={'horizontal'} droppableId={'kanban'}>
                            <ColumnsContainer>
                                {
                                    kanbans?.map((kanban, index) => (
                                        // Draggable 可拖拽的每一项
                                        <Drag key={kanban.id} draggableId={'kanban' + kanban.id} index={index}>
                                            <KanbanColumn kanban={kanban} key={kanban.id}/>
                                        </Drag>
                                    ))
                                }
                                {/*创建看板*/}
                                <CreateKanban/>
                            </ColumnsContainer>
                        </Drop>
                    )
                }
                {/*    编辑task*/}
                <TaskModal/>

            </ScreenContainer>
        </DragDropContext>
    );
};

export default KanBanScreen;

export const ColumnsContainer = styled(DropChild)`
  display: flex;
  overflow-x: scroll;
  // 侵占父亲剩余的空间
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`