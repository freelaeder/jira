import React, {FormEvent, useEffect} from 'react';
import {useAuth} from "../context/auth-context";
import {Button, Form} from "antd";
import {LoginButon} from "./index";

// 登录页面
const LoginScreen = () => {
    // 调用自定义hook  获取全局状态
    const {login, user} = useAuth()
    // 表单验证通过触发的提交事件
    const handleSubmit = (values:{username:string,password:string}) => {
        console.log(values)
        login(values)
    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'username'} rules={[{required:true,message:'请输入用户名'}]}>
                <input placeholder={'请输入用户名'} type="text " id={'username'}/>
            </Form.Item>
            <Form.Item name={'password'} rules={[{required:true,message:'请输入密码'}]}>
                <input placeholder={'请输入密码'} type="text " id={'password'}/>
            </Form.Item>
            <Form.Item>
                <LoginButon htmlType={'submit'} type={'primary'} >login</LoginButon>
            </Form.Item>
        </Form>
    );
};

export default LoginScreen;