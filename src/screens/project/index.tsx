import React from 'react';
import {Link} from "react-router-dom";
import {Navigate, Route, Routes, useLocation} from "react-router";
import KanBanScreen from "../Kanban";
import EpicScreen from "../epic";
import styled from "@emotion/styled";
import {Menu} from "antd";

// 获取当前路径的最后一个参数
const useRouteType = () => {
    const units = useLocation().pathname.split('/')
    return units[units.length - 1]
}

const ProjectScreen = () => {
    // 当前路径的最后一个参数
    const routeType = useRouteType()
    return (
        <Container>
            <Aside>
                <Menu mode={'inline'} selectedKeys={[routeType]}>
                    <Menu.Item key={'kanban'}>
                        <Link to={'kanban'}>看板</Link>
                    </Menu.Item>
                    <Menu.Item key={'epic'}>
                        <Link to={'epic'}>任务组</Link>
                    </Menu.Item>
                </Menu>

            </Aside>
            <Main>
                <Routes>
                    <Route path={'/kanban'} element={<KanBanScreen/>}/>
                    <Route path={'/epic'} element={<EpicScreen/>}/>
                    {/*进入默认显示看板组件*/}
                    {/* ./kanban 代表不破坏之前的路径追加 ，因为它是子路由 需要追加在之前的路由上 */}
                    {/*  如果直接写 /kanban 会直接在跟路由开始 */}
                    {/*  path= '/' 重定向  */}
                    <Route path={'/'} element={<Navigate replace={true} to={'./kanban'}/>}/>
                </Routes>
            </Main>
        </Container>
    );
};

export default ProjectScreen;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`

const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
`