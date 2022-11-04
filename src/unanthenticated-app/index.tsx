// 用户未登录的页面 入口文件

import {useState} from "react";
import RegisterScreen from "./register";
import LoginScreen from "./login";
import {Button, Card, Divider, Typography} from "antd";
// 引入 amotion
import styled from "@emotion/styled";
// 引入图片
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'

export const UnanthenticatedApp = () => {
    // 定义在 login 和 register 之间切换的状态
    // 默认登录界面
    const [IsRegister, SetIsRegister] = useState(false)
    // 登录失败显示的错误信息
    const [error, setError] = useState<Error | null>(null)
    return (

        <Container>
            {/*header*/}
            <Header/>
            <Background/>
            {/*卡片*/}
            <ShadowCard>
                {/*标题*/}
                <Title>
                    {IsRegister ? '请注册' : '请登录'}
                </Title>
                {/*错误信息*/}
                {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
                {/*显示的组件*/}
                {
                    IsRegister ? <RegisterScreen onError={setError}/> : <LoginScreen onError={setError} />
                }
                {/*分割线*/}
                <Divider/>
                {/*    按钮点击切换 显示组件*/}
                <Button type={'link'}
                        onClick={() => SetIsRegister(!IsRegister)}>{IsRegister ? '已有账号了?直接登录' : '没有账号，注册新账号'}</Button>
            </ShadowCard>
        </Container>
    )

}
//创建 emotion
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`
// header
const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`
// background
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  //决定背景图是否随着页码滑动
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem), calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`
// 不是原始html
//{/*卡片*/}
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`
//title
const Title = styled.h2`
  margin-top: 2.4rem;
  color: rgb(94, 108, 132);
`
// 登录按钮
export const LoginButon = styled(Button)`
  width: 100%;
`