import {Button, Dropdown, Menu, Modal, Table, TableProps} from "antd";
import dayjs from "dayjs";
// 宿主环境 浏览器
import {Link} from 'react-router-dom'
import {Pin} from "../../components/pin";
import {useDeleteProject, useEditProject} from "../../utils/project";
import React from "react";
import {useProjectModal, useProjectsQueryKey} from "./util";
import {Project} from "../../types/project";
import {User} from "../../types/user";

export interface listProps extends TableProps<Project> {
    users: User[],
}

export const List = ({users, ...props}: listProps) => {
    const {mutate} = useEditProject(useProjectsQueryKey())
    // 先让project.id先消化
    const pinProject = (id: number) => (pin: boolean) => mutate({id, pin})
    return (
        // rowKey 每一行的 unique key
        <Table rowKey={(list) => list.id} pagination={false}
               columns={[
                   {
                       title: <Pin checked={true} disabled={true}/>,
                       render(value, project) {
                           return <Pin
                               checked={project.pin}
                               onCheckedChange={pinProject(project.id)}
                           />
                       }
                   },
                   {
                       title: '名称',
                       align: 'center',
                       width: '30rem',
                       sorter: (a, b) => a.name.localeCompare(b.name),
                       render(value, project) {
                           return <Link to={String(project.id)}>{project.name}</Link>
                       }
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
                   },
                   {
                       render(value, project) {
                           return <More project={project} />

                       }

                   }


               ]}
               {...props}
        />
    )

}

const More = ({ project }: { project: Project }) => {
    const { startEdit } = useProjectModal();
    // 编辑项目
    const editProject = (id: number) => () => startEdit(id);
    const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
   // 删除项目
    const confirmDeleteProject = (id: number) => {
        Modal.confirm({
            title: "确定删除这个项目吗?",
            content: "点击确定删除",
            okText: "确定",
            onOk() {
                deleteProject({ id });
            },
        });
    };
    return (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item onClick={editProject(project.id)} key={"edit"}>
                        编辑
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => confirmDeleteProject(project.id)}
                        key={"delete"}
                    >
                        删除
                    </Menu.Item>
                </Menu>
            }
        >
            <Button type={"link"}>...</Button>
        </Dropdown>
    );
};