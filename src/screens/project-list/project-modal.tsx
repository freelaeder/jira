import {Button, Drawer, Form, Input, Spin} from "antd";
import {useProjectModal} from "./util";
import UserSelect from "../../components/user-select";
import {useAddProject, useEditProject} from "../../utils/project";
import {useForm} from "antd/es/form/Form";
import {useEffect} from "react";
import {ErrorBox} from "../../components/lib";
import styled from "@emotion/styled";

// 编辑项目的组件
export const ProjectModal = () => {
    const {projectModalOpen, close, isLoading, editingProject} = useProjectModal()
    // 标题
    const title = editingProject ? '编辑项目' : '创建项目'
    // 是否在编辑 还是创建 返回hook
    const useMutateProject = editingProject ? useEditProject : useAddProject


    // 等创建完成等 关闭 窗口
    const {mutateAsync, error, isLoading: mutateLoading} = useMutateProject()
    // 重置表单
    const [form] = useForm()
    useEffect(() => {
        form.setFieldsValue(editingProject)
    }, [editingProject, form])
    // 提交事件
    const onFinish = (values: any) => {
        mutateAsync({...editingProject, ...values}).then(() => {
            //重置表单             // 关闭窗口
            form.resetFields()
            close()
        })
    }


    // forceRender={true} 强制刷新
    return <Drawer forceRender={true} onClose={close} width={'100%'} visible={projectModalOpen}>
        {
            isLoading ? <Spin size={'large'}/> :
                <Container>
                    <h1>{title}</h1>
                    <ErrorBox error={error}/>
                    <Form form={form} onFinish={onFinish} layout={'vertical'} style={{width: '40rem'}}>
                        <Form.Item label={'名称'} name={'name'} rules={[{required: true, message: '请输入项目名称'}]}>
                            <Input placeholder={'请输入项目名称'}/>
                        </Form.Item>
                        <Form.Item label={'部门'} name={'organization'}
                                   rules={[{required: true, message: '请输入部门名称'}]}>
                            <Input placeholder={'请输入部门名称'}/>
                        </Form.Item>
                        <Form.Item label={'负责人'} name={'personId'}>
                            <UserSelect defaultOptionName={'负责人'}/>
                        </Form.Item>
                        <Form.Item style={{textAlign: 'right'}}>
                            <Button loading={mutateLoading} type={'primary'} htmlType={'submit'}>提交</Button>
                        </Form.Item>
                    </Form>
                    <Button onClick={close}>close</Button>
                </Container>

        }
    </Drawer>
}

const Container = styled.div`
  flex-direction: column;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`