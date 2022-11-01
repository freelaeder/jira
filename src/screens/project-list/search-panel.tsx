import {useEffect, useState} from "react"
import {Input, Select} from "antd";

export interface  User {
  id:string
  name:string
  email:string
  title:string
  organization:string
  token:string
}

interface SearchPanelProps {
  users:User[],
  param:{
    name:string
    personId:string
  },
  setParam:(param:SearchPanelProps['param']) => void

}



export const SearchPanel = ({param,setParam,users}:SearchPanelProps) =>{



  return  <form  action="">
    <div>
  {/* setParam(Object.assign({},param,{name:evt.target.value})) */}
      <Input type="text" value={param.name} onChange={evt => setParam({...param,name:evt.target.value})} />
      {/*点击切换 动态改变 personId */}
      <Select value={ param.personId} onChange={value => setParam({
        ...param,
        personId:value
      })}>
        <Select.Option value={''}>负责人</Select.Option>
        {users.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
      </Select>
    </div>
  </form> 
}