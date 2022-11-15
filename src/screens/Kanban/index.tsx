import React from 'react';
import {useDocumentTitle} from "../../utils";
import {useKanbanSearchParams, useProjectInUrl} from "./util";
import {useKanbans} from "../../utils/kanban";
import {KanbanColumn} from "./kanban-column";
import styled from "@emotion/styled";
import {SearchPanel} from "./search-panel";
import {ScreenContainer} from "../../components/lib";

const KanBanScreen = () => {
    // 指定标题
    useDocumentTitle('看板列表', false)
    // 获取kanban数据
    const {data: currentProject} = useProjectInUrl()
    const {data: kanbans = []} = useKanbans(useKanbanSearchParams())

    return (
        <ScreenContainer>
            <h1>{currentProject?.name}</h1>
            <SearchPanel />
            <ColumnsContainer>
                {
                    kanbans?.map(kanban => (
                        <KanbanColumn kanban={kanban} key={kanban.id}/>
                    ))
                }
            </ColumnsContainer>

        </ScreenContainer>
    );
};

export default KanBanScreen;

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  // 侵占父亲剩余的空间
  flex: 1;
`