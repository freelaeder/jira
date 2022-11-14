import {SearchPanel} from "./search-panel"
import {List} from "./list"
import {useDebounce, useDocumentTitle} from "../../utils";
import styled from "@emotion/styled";
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";
import {Button, Typography} from "antd";
import {useUrlQueryParam} from "../../utils/url";
import {useProjectModal, useProjectsSearchParams} from "./util";
import {ErrorBox, Row} from "../../components/lib";
import React from "react";

export const ProjectListScreen = () => {
    // 改变当前页面title false 离开项目列表时， 页面还原初始值
    useDocumentTitle('项目列表', false)
    // 保存用户输入的项目名 用户Id
    // 基本类型 可以放到依赖中 组件状态 可以放到依赖中
    //非组件状态 绝不能放到依赖中
    const [param, setParam] = useProjectsSearchParams()
    // 使用 useDebounce 减少请求频率
    // 使用useProjects 获取项目列表
    const {isLoading, error, data: list} = useProjects(useDebounce(param, 200))
    // 获取用户
    const {data: users} = useUsers()
    const {open} = useProjectModal()
    return (
        <Container>
            <Row between={true}>
                <h1 style={{paddingBottom:'0.5rem'}}>项目列表</h1>
                <Button onClick={open}>创建项目</Button>
            </Row>
            <SearchPanel users={users || []} param={param} setParam={setParam}/>
            {/*错误信息*/}
            <ErrorBox error={error}/>
            <List   loading={isLoading} users={users || []} dataSource={list || []}/>
        </Container>
    )
}
// 指定追踪那个一个文件
// ProjectListScreen.whyDidYouRender = true
const Container = styled.div`
  padding: 3.2rem;
`