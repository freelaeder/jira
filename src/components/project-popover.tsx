import {Button, Divider, List, Popover, Typography} from "antd";
import {useProjects} from "../utils/project";
import styled from "@emotion/styled";
import {ButtonNoPadding} from "./lib";
import {jsx} from "@emotion/react";
import JSX = jsx.JSX;

// 气泡卡片 鼠标移动项目 展示的卡片
// https://ant.design/components/popover-cn/#header
export const ProjectPopover = (props: { projectButton: JSX.Element }) => {
    // 获取收藏项目列表
    const {data: projects, isLoading} = useProjects()
    const pinnedProjects = projects?.filter(item => item.pin)

    const content = (
        <ContentContainer>
            <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
            {/*收藏项目列表*/}
            <List>
                {
                    pinnedProjects?.map(project => <List.Item key={project.id}>
                        <List.Item.Meta key={project.id} title={project.name}/>
                    </List.Item>)
                }
            </List>
            {/*    分割线*/}
            <Divider/>
            {/*    创建项目*/}
            {/*<ButtonNoPadding onClick={() => props.setProjectModalOpen(true)} type={'link'}> 创建项目 </ButtonNoPadding>*/}
            {/*使用组件组合*/}
            {props.projectButton}
        </ContentContainer>
    )
    return (
        <Popover placement={'bottom'} content={content}>
            <span>项目</span>
        </Popover>
    )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`

