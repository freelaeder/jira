import {SearchPanel} from "./search-panel"
import {List} from "./list"
import {useEffect, useState} from "react";
import {cleanObject} from "../../utils";
import qs from 'qs'
// 导入 服务器地址
const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([])

    // 定义一个list 保存
    const [list, setList] = useState([])

    // 发送请求 获取projects
    useEffect(() => {
        // qs stringify 会自动转化 拼接  projects?personId=1
        // cleanObject 会清空 value 为空的 key
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [param])
    // [param] 当值 发生改变 再次执行 effect
    // deps 不写 监测全部
    // 发送请求 保存 users
    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    }, [])
    // deps []  只运行一次的 effect（仅在组件挂载和卸载时执行）
    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam}/>
            <List users={users} list={list}/>
        </div>
    )
}