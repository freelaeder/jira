import {SearchPanel} from "./search-panel"
import {List} from "./list"
import {useEffect, useState} from "react";
import {cleanObject, useDebounce, useMount} from "../../utils";
import {useHttp} from "../../utils/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
    // 保存 用户名 项目名
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    // 保存 用户
    const [users, setUsers] = useState([])

    // 定义一个list 保存项目信息
    const [list, setList] = useState([])
    // 使用usedebounce
    const debouncedParam = useDebounce(param, 500)
    // 使用 useHttp
    const client = useHttp()

    // 发送请求 获取projects
    useEffect(() => {
        // client('projects',{data:cleanObject(debouncedParam)}).then((data) => setList(data))
        // 两个代码效果一致
        //
        client('projects', {data: cleanObject(debouncedParam)}).then(setList)
        // qs stringify 会自动转化 拼接  projects?personId=1
        // cleanObject 会清空 value 为空的 key
        // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
        //     if (response.ok) {
        //         setList(await response.json())
        //     }
        // })
    }, [debouncedParam])
    // [param] 当值 发生改变 再次执行 effect
    // deps 不写 监测全部
    // 发送请求 保存 users
    // useEffect(() => {
    //     fetch(`${apiUrl}/users`).then(async response => {
    //         if (response.ok) {
    //             setUsers(await response.json())
    //         }
    //     })
    // }, [])     // deps []  只运行一次的 effect（仅在组件挂载和卸载时执行）
    useMount(() => {
        client('users').then(setUsers)
    })
    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel users={users} param={param} setParam={setParam}/>
            <List users={users} list={list}/>
        </Container>
    )
}

const Container = styled.div`
  padding: 3.2rem;
`