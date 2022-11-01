import {useEffect, useState} from "react";
import react from 'react'
import {User} from "./search-panel";
import {Table} from "antd";

interface Project {
    id: string
    name: string
    personId: string
    pin: boolean
    organization: string
}

interface listProps {
    list: Project[]
    users: User[]

}

export const List = ({list, users}: listProps) => {

    return (
        <Table pagination={false} dataSource={list} columns={[{title: '名称',align:'center', width:'30%', dataIndex: 'name',sorter:(a,b) => a.name.localeCompare(b.name)}, {
            title: '负责人',
            render(value, project) {
                return (
                    //    {/*  如果找不到 返回undefined */}
                    //               {/*  如果？ 之前的代码 报错 整体 返回undefined*/}
                    <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
                )
            }
        }]}/>
    )

}