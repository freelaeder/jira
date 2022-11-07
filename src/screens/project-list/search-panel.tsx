/** @jsxImportSource @emotion/react */
import {Form, Input, Select} from "antd";
import {Project} from "./list";
import UserSelect from "../../components/user-select";

export interface User {
    id: number
    name: string
    email: string
    title: string
    organization: string
    token: string
}

interface SearchPanelProps {
    users: User[],
    // 从Project 拿出 name personId
    param: Partial<Pick<Project, 'name' | 'personId'>>
    setParam: (param: SearchPanelProps['param']) => void

}


export const SearchPanel = ({param, setParam, users}: SearchPanelProps) => {


    return <Form css={{marginBottom: '2rem', '>*': ''}} layout={'inline'}>
        <Form.Item>
            {/* setParam(Object.assign({},param,{name:evt.target.value})) */}
            <Input placeholder={'请输入项目名'} type="text" value={param.name}
                   onChange={evt => setParam({...param, name: evt.target.value})}/>
        </Form.Item>
        <Form.Item>
            {/*点击切换 动态改变 personId */}
            <UserSelect
                defaultOptionName={'负责人'}
                value={param.personId}
                onChange={value => setParam({
                    ...param,
                    personId: value
                })}/>
        </Form.Item>
    </Form>
}