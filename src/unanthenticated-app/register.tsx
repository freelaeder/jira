import React from 'react';
import {useAuth} from "../context/auth-context";
import {Form} from "antd";
import {LoginButon} from "./index";
import {useAsync} from "../utils/use-async";

// 注册界面

const RegisterScreen = ({onError}: { onError: (error: Error) => void }) => {
    // 调用自定义hook  获取全局状态
    const {register} = useAuth()
    const {run, isLoading} = useAsync(undefined, {thorwOnError: true})
    // 表单验证通过触发的提交事件
    // cpassword 不参与 服务器的交互
    const handleSubmit = async ({cpassword, ...values}: { username: string, password: string, cpassword: string }) => {
        // 判断两次输入是否一致
        if (cpassword !== values.password) {
            onError(new Error('两次密码需要相同'))
            // 阻止运行
            return
        }

        try {
            await run(register(values))
        } catch (error: any) {
            onError(error)
        }
    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'username'} rules={[{required: true, message: '请输入你的用户名'}]}>
                <input placeholder={'请输入用户名'} type="text " id={'username'}/>
            </Form.Item>
            <Form.Item name={'password'} rules={[{required: true, message: '请输入你的密码'}]}>
                <input placeholder={'请输入密码'} type="text " id={'password'}/>
            </Form.Item>
            <Form.Item name={'cpassword'} rules={[{required: true, message: '请确认密码'}]}>
                <input placeholder={'再次输入密码'} type="text " id={'cpassword'}/>
            </Form.Item>
            <Form.Item>
                <LoginButon loading={isLoading} htmlType={'submit'} type={'primary'}>register</LoginButon>
            </Form.Item>
        </Form>
    );
};

export default RegisterScreen;