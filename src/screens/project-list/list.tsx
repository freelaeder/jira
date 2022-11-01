import {useEffect, useState} from "react";
import react from 'react'
import {User} from "./search-panel";
import {Table} from "antd";
import dayjs from "dayjs";

interface Project {
    id: string
    name: string
    personId: string
    pin: boolean
    organization: string
    created: number
}

interface listProps {
    list: Project[]
    users: User[]

}

export const List = ({list, users}: listProps) => {

    return (
        <Table pagination={false} dataSource={list} columns={[
            {
                title: '名称',
                align: 'center',
                dataIndex: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name)
            },
            {
                title: '部门',
                dataIndex: 'organization'
            },
            {
                title: '负责人',
                render(value, project) {
                    return (
                        //    {/*  如果找不到 返回undefined */}
                        //               {/*  如果？ 之前的代码 报错 整体 返回undefined*/}
                        <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
                    )
                }
            },
            {
                title: '创建时间',
                render(value, project) {
                    return (
                        <span>
                        {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
                        </span>
                    )
                }
            }

        ]}/>
    )

}