// 用户登录之后的界面 入口文件

import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";
import {Row} from "./components/lib";
import {ReactComponent as SoftWareLogo} from 'assets/software-logo.svg'
import {Button, Dropdown} from "antd";
// menu
import type {MenuProps} from 'antd/es/menu';
import React from "react";
// icons
import {SmileTwoTone} from "@ant-design/icons";
// react-route 管理路由状态 就像一个变量，计算当前对象 结果交给react-route-dom 消费 /
import {Navigate, Route, Routes} from 'react-router'
import ProjectScreen from "./screens/project";
import {BrowserRouter as Router} from 'react-router-dom'
import {resetRoute} from "./utils";
import {ProjectModal} from "./screens/project-list/project-modal";
import {ProjectPopover} from "./components/project-popover";
import {UserPopover} from "./components/use-popover";
import CalendarPopover from "./screens/calendar/calendar-popover";
import CalendarScreen from "./screens/calendar";
import {useTheme} from "./context/theme-context";
import PersonalDisplay from "./screens/personal-display";

export const AuthenticatedApp = () => {
    // 定义编辑项目的开关
    // const [projectModalOpen, setProjectModalOpen] = useState(false)
    return (
        <Container>
            {/*    路由*/}
            <Router>
                <PageHeader
                />
                {/*// 主体内容*/}
                <Main>
                    <Routes>
                        {/*项目列表*/}
                        <Route path={'/projects'} element={<ProjectListScreen/>}></Route>
                        {/*详细项目页*/}
                        <Route path={'/projects/:projectId/*'} element={<ProjectScreen/>}></Route>
                        {/*日历页*/}
                        <Route path={'/calendar'} element={<CalendarScreen />} ></Route>
                        {/*个人展示页*/}
                        <Route path={'/personal/:personName/*'} element={<PersonalDisplay />} ></Route>
                        {/*    设置路由重定向*/}
                        <Route path={'/'} element={<Navigate to={'/projects'}/>}></Route>
                    </Routes>
                </Main>
                <ProjectModal/>
            </Router>

        </Container>
    )
}

const PageHeader = () => {

    return <Header between={true}>
        {/*gap =true  === margin-right: 2rem */}
        <HeaderLeft gap={true}>

            <Button style={{paddingRight: 0}} type={'link'} onClick={resetRoute}>
                <SoftWareLogo width={'18rem'} color={'rgb(38,132,255)'}/>
            </Button>
            {/*收藏的项目*/}
            <ProjectPopover/>
            {/*用户*/}
            <UserPopover/>
            {/*    日历组件*/}
            <CalendarPopover/>
        </HeaderLeft>
        <HeaderRight>
            <User/>
        </HeaderRight>
    </Header>

}

const User = () => {
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

    // 展示的label 项
    const items: MenuItem[] = [
        getItem('logout', '1',)
    ]
    // 定义点击item项触发的事件 登出操作
    const onClick: MenuProps['onClick'] = ({key}) => {
        // message.warn('即将退出',1);
        logout()
    };
    const {changeTheme} = useTheme()
    return <>
        <SmileTwoTone onClick={ changeTheme} spin={true} style={{fontSize: '16px', color: '#08c'}}/>
        <Dropdown menu={{items, onClick}}
        >
            <Button onClick={e => e.preventDefault()} type={'link'}> Hi, {user?.name} </Button>
        </Dropdown>
    </>

}
const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 6rem 1fr;
`

// 主体内容
const Main = styled.main`
  display: flex;
  overflow: hidden;
`
// grid-area 用来给grid 子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``

