import React from 'react';
import {useAuth} from "../context/auth-context";
import {Form, message, Typography} from "antd";
import {LoginButon} from "./index";
import {useAsync} from "../utils/use-async";

// 登录页面
const LoginScreen = ({onError}: { onError: (error: Error) => void }) => {
    // 调用自定义hook  获取全局状态
    const {login} = useAuth()
    const {run, isLoading, error} = useAsync(undefined, {thorwOnError: true})
    // 表单验证通过触发的提交事件
    const handleSubmit = async (values: { username: string, password: string }) => {
        try {
            await run(login(values))
            message.success('登录成功', 1.5)
        } catch (e: any) {
            onError(e)
        }
    }
    return (
        <Form onFinish={handleSubmit}>
            {/*错误信息*/}
            {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
            <Form.Item name={'username'} rules={[{required: true, message: '请输入用户名'}]}>
                <input placeholder={'请输入用户名'} type="text " id={'username'}/>
            </Form.Item>
            <Form.Item name={'password'} rules={[{required: true, message: '请输入密码'}]}>
                <input placeholder={'请输入密码'} type="text " id={'password'}/>
            </Form.Item>
            <Form.Item>
                <LoginButon loading={isLoading} htmlType={'submit'} type={'primary'}>login</LoginButon>
            </Form.Item>
        </Form>
    );
};

export default LoginScreen;