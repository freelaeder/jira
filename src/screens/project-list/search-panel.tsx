/** @jsxImportSource @emotion/react */
import {Form, Input, Select} from "antd";

export interface User {
    id: string
    name: string
    email: string
    title: string
    organization: string
    token: string
}

interface SearchPanelProps {
    users: User[],
    param: {
        name: string
        personId: string
    },
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
            <Select value={param.personId} onChange={value => setParam({
                ...param,
                personId: value
            })}>
                <Select.Option value={''}>负责人</Select.Option>
                {users.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
            </Select>
        </Form.Item>
    </Form>
}