import React from 'react';
import {useDocumentTitle} from "../../utils";
import {useKanbanSearchParams, useProjectInUrl} from "./util";
import {useKanbans} from "../../utils/kanban";
import {KanbanColumn} from "./kanban-column";
import styled from "@emotion/styled";
import {SearchPanel} from "./search-panel";

const KanBanScreen = () => {
    // 指定标题
    useDocumentTitle('看板列表', false)
    // 获取kanban数据
    const {data: currentProject} = useProjectInUrl()
    const {data: kanbans = []} = useKanbans(useKanbanSearchParams())

    return (
        <div>
            <h1>{currentProject?.name}</h1>
            <SearchPanel />
            <ColumnsContainer>
                {
                    kanbans?.map(kanban => (
                        <KanbanColumn kanban={kanban} key={kanban.id}/>
                    ))
                }
            </ColumnsContainer>

        </div>
    );
};

export default KanBanScreen;

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`