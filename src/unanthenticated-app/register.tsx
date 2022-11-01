import React, {FormEvent, useEffect} from 'react';
import {useAuth} from "../context/auth-context";
import {Button, Form} from "antd";
import {LoginButon} from "./index";

// 注册界面

const RegisterScreen = () => {
    // 调用自定义hook  获取全局状态
    const {register, user} = useAuth()
    // 表单验证通过触发的提交事件
    const handleSubmit = (values: { username: string, password: string }) => {
        register(values)
    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'username'} rules={[{required: true, message: '请输入你的用户名'}]}>
                <input type="text " id={'username'}/>
            </Form.Item>
            <Form.Item name={'password'} rules={[{required: true, message: '请输入你的密码'}]}>
                <input type="text " id={'password'}/>
            </Form.Item>
            <Form.Item>
                <LoginButon htmlType={'submit'} type={'primary'}>register</LoginButon>
            </Form.Item>
        </Form>
    );
};

export default RegisterScreen;