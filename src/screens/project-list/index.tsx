import {SearchPanel} from "./search-panel"
import {List} from "./list"
import {useState} from "react";
import {useDebounce, useDocumentTitle} from "../../utils";
import styled from "@emotion/styled";
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";
import {Typography} from "antd";

export const ProjectListScreen = () => {
    // 保存用户输入的项目名 用户Id
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    // 使用 useDebounce 减少请求频率
    const debouncedParam = useDebounce(param, 500)

    // 使用useProjects 获取项目列表
    const {isLoading, error, data: list} = useProjects(debouncedParam)
    // 获取用户
    const {data: users} = useUsers()
    // 改变当前页面title false 离开项目列表时， 页面还原初始值
    useDocumentTitle('项目列表',false)
    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel users={users || []} param={param} setParam={setParam}/>
            {/*如果发生错误*/}
            {error ?  <Typography.Text type={'danger'}>{error.message} </Typography.Text> : null }
            <List loading={isLoading} users={users || []} dataSource={list || []}/>
        </Container>
    )
}

const Container = styled.div`
  padding: 3.2rem;
`