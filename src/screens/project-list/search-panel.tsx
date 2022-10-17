import {useEffect, useState} from "react"

export interface  User {
  id:string
  name:string
  email:string
  title:string
  organization:string
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
      <input type="text" value={param.name} onChange={evt => setParam({...param,name:evt.target.value})} />
      {/*点击切换 动态改变 personId */}
      <select value={ param.personId} onChange={evt => setParam({
        ...param,
        personId:evt.target.value
      })}>
        <option value={''}>负责人</option>
        {users.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
      </select>
    </div>
  </form> 
}