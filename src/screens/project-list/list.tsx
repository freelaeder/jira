import {User} from "./search-panel";
import {Table, TableProps} from "antd";
import dayjs from "dayjs";
// 宿主环境 浏览器
import {Link} from 'react-router-dom'
import {Pin} from "../../components/pin";
import {useEditProject} from "../../utils/project";

export interface Project {
    id: number
    name: string
    personId: number
    // 是否收藏
    pin: boolean
    organization: string
    created: number
}

export interface listProps extends TableProps<Project> {
    users: User[],
    refresh?:() =>void,

}

export const List = ({users, ...props}: listProps) => {
    const {mutate} = useEditProject()
    // 先让project.id先消化
    const pinProject = (id: number) => (pin: boolean) => mutate({id,pin}).then(props.refresh)

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
                   }

               ]}
               {...props}
        />
    )

}