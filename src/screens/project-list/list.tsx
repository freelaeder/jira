import {useEffect, useState} from "react";
import react from 'react'
import {User} from "./search-panel";
interface Project{
    id:string
    name:string
    personId:string
    pin:boolean
    organization:string
}
interface  listProps {
    list:Project[]
    users:User[]

}
export const List = ({list,users}:listProps) =>{

  return (
      <table>
        <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
        </thead>
        <tbody>
        {list.map(project => (
            <tr key={project.id}>
              <td>{project.name}</td>
              {/*  如果找不到 返回undefined */}
              {/*  如果？ 之前的代码 报错 整体 返回undefined*/}
              <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
            </tr>
        ))}
        </tbody>

      </table>
  )
}