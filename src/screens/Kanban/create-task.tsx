import {useEffect, useState} from "react";
import {useAddTask} from "../../utils/task";
import {useProjectIdInUrl, useTasksQueryKey} from "./util";
import {Card, Input} from "antd";


// 添加看板里的任务
export const CreateTask = ({kanbanId}: { kanbanId: number }) => {
    // 任务的名字
    const [name, setName] = useState('')
    // 添加task的方法
    const {mutateAsync: addTask} = useAddTask(useTasksQueryKey())
    // 当前的url的 id
    const projectId = useProjectIdInUrl()
    // 输入框的状态
    const [inputMode, setInputMode] = useState(false)

    // 提交
    const submit = async () => {
        await addTask({projectId, name, kanbanId})
        setInputMode(false)
        // 清空
        setName('')

    }
    // 切换输入框的状态
    const toggle = () => setInputMode(!inputMode)

    //监测inputmode
    useEffect(() => {
        // 当inputMode 为false 重置名字
        if (!inputMode) {
            setName('')
        }
    }, [
        inputMode
    ])
    // 当inputMode 为false 第一次展示
    if (!inputMode) {
        return <div onClick={toggle}>+创建事务</div>
    }
    // 当点击 创建事务之后 展示 卡片
    return (
        <Card>
            <Input onBlur={toggle}
                   placeholder={'需要做些什么'}
                   autoFocus={true}
                   onPressEnter={submit}
                   value={name}
                   onChange={evt => setName(evt.target.value)}
            />
        </Card>
    )


}