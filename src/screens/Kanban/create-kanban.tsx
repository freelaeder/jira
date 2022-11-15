import {useState} from "react";
import {useKanbansQueryKey, useProjectIdInUrl} from "./util";
import {useAddKanban} from "../../utils/kanban";
import {Input} from "antd";
import {Container} from "./kanban-column";

// 创建新的看板
export const CreateKanban = () => {
    // 看板的名字
    const [name, setName] = useState('')
    const projectId = useProjectIdInUrl()
    // 添加看板`的方法
    const {mutateAsync: addKanban} = useAddKanban(useKanbansQueryKey())

    // 提交看板
    const submit = async () => {
        await addKanban({name, projectId})
        // 重置名字
        setName('')
    }

    return <Container>
        {/*onPressEnter  按下回车触发*/}
        <Input size={'large'} placeholder={'新建看板名称'} onPressEnter={submit} value={name}
               onChange={evt => setName(evt.target.value)}/>
    </Container>

}