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
        <ScreenContainer>
            <h1>{currentProject?.name}</h1>
            {/*搜索框*/}
            <SearchPanel/>
            {/*  判断是不是loading*/}
            {
                isLoading ? <Spin size={'large'}/> : <ColumnsContainer>
                    {
                        kanbans?.map(kanban => (
                            <KanbanColumn kanban={kanban} key={kanban.id}/>
                        ))
                    }
                    {/*创建看板*/}
                    <CreateKanban/>
                </ColumnsContainer>
            }
        {/*    编辑task*/}
            <TaskModal />

        </ScreenContainer>
    );
};

export default KanBanScreen;

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  // 侵占父亲剩余的空间
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`