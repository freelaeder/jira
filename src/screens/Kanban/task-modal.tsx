import {useForm} from "antd/es/form/Form";
import {useTasksModal, useTasksQueryKey} from "./util";
import {useDeleteTask, useEditTask} from "../../utils/task";
import {useEffect} from "react";
import {Button, Form, Input, Modal} from "antd";
import UserSelect from "../../components/user-select";
import TaskTypeSelect from "../../components/task-type-select";

// antd自带样式
const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
}


export const TaskModal = () => {
    // 表单
    const [form] = useForm()
    // 获取当前的task详情
    const {editingTask, editingTaskId, close} = useTasksModal()
    // 编辑task
    const {mutateAsync: editTask, isLoading: editLoading} = useEditTask(useTasksQueryKey())
    // 删除task
    const {mutate: deleteTask} = useDeleteTask(useTasksQueryKey())
    // 点击取消
    const onCancel = () => {
        // 关闭窗口 重置表单
        close()
        form.resetFields()
    }
    // 点击ok
    const onOk = async () => {
        await editTask({...editingTask, ...form.getFieldsValue()})
        close()
    }
    // 点击删除
    const startDelete = () => {
        // 关闭任务编辑的窗口
        close()
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除任务吗',
            onOk() {
                return deleteTask({id: Number(editingTaskId)})
            }
        })
    }
    useEffect(() => {
        form.setFieldsValue(editingTask)
    }, [form, editingTask])

    return (
        //forceRender={true}  不管open的值 上来就加载一次
        <Modal forceRender={true} onCancel={onCancel} onOk={onOk} open={!!editingTaskId} okText={'确认'}
               cancelText={'取消'}
               confirmLoading={editLoading}
               title={'编辑任务'}>
            <Form {...layout} initialValues={editingTask} form={form}>
                <Form.Item label={'任务名'} name={'name'} rules={[{required: true, message: '必须输入任务名'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label={'经办人'} name={'processorId'}>
                    <UserSelect defaultOptionName={'经办人'}/>
                </Form.Item>
                <Form.Item label={'类型'} name={'typeId'}>
                    <TaskTypeSelect/>
                </Form.Item>
            </Form>
            {/*删除*/}
            <div style={{textAlign: 'right'}}>
                <Button onClick={startDelete} style={{fontSize: '14px'}} size={'small'}>删除</Button>
            </div>
        </Modal>
    )

}