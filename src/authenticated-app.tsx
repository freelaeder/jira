// 用户登录之后的界面 入口文件

import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";
import {Row} from "./components/lib";
import {ReactComponent as SoftWareLogo} from 'assets/software-logo.svg'
import {Button, Dropdown, Menu} from "antd";
// menu
import type {MenuProps} from 'antd/es/menu';
import React from "react";
// icons
import {LogoutOutlined, SmileTwoTone} from "@ant-design/icons";
// react-route 管理路由状态 就像一个变量，计算当前对象 结果交给react-route-dom 消费 /
import {Navigate, Route, Routes} from 'react-router'
import ProjectScreen from "./screens/project";
import {BrowserRouter as Router} from 'react-router-dom'
import {resetRoute} from "./utils";

export const AuthenticatedApp = () => {


    return (
        <Container>
            <PageHeader/>
            {/*// 主体内容*/}
            <Main>
                {/*    路由*/}
                <Router>
                    <Routes>
                        {/*项目列表*/}
                        <Route path={'/projects'} element={<ProjectListScreen/>}></Route>
                        {/*详细项目页*/}
                        <Route path={'/projects/:projectId/*'} element={<ProjectScreen/>}></Route>
                        {/*    设置路由重定向*/}
                        <Route path={'/'} element={<Navigate to={'/projects'}/>}></Route>

                    </Routes>
                </Router>

            </Main>
        </Container>
    )
}

const PageHeader = () => {
    const {user, logout} = useAuth()
    type MenuItem = Required<MenuProps>['items'][number];

    // 返回 items
    function getItem(
        label: React.ReactNode,
        key?: React.Key | null,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }

    const items: MenuItem[] = [
        getItem('logout', '1',)
    ]
    return <Header between={true}>
        {/*gap =true  === margin-right: 2rem */}
        <HeaderLeft gap={true}>
            <Button type={'link'} onClick={resetRoute} >
                <SoftWareLogo width={'18rem'} color={'rgb(38,132,255)'}/>
            </Button>

            <h3>project</h3>
            <h3>user</h3>
        </HeaderLeft>
        <HeaderRight>
            {/*<UserOutlined twoToneColor="#eb2f96" style={{ fontSize: '16px', color: '#08c' }} />*/}
            <SmileTwoTone spin={true} style={{fontSize: '16px', color: '#08c'}}/>
            <Dropdown overlay={
                <Menu overflowedIndicator={<LogoutOutlined/>} theme={'light'} onClick={logout} items={items}/>
            }>
                <Button onClick={e => e.preventDefault()} type={'link'}> Hi, {user?.name} </Button>
            </Dropdown>

        </HeaderRight>
    </Header>

}
const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 6rem 1fr;
`

// 主体内容
const Main = styled.main``
// grid-area 用来给grid 子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``

