// 用户登录之后的界面 入口文件

import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";
import {Row} from "./components/lib";
import {ReactComponent as SoftWareLogo} from 'assets/software-logo.svg'
import {Dropdown, Menu} from "antd";

export const AuthenticatedApp = () => {
    const {logout, user} = useAuth()
    return (
        <Container>
            {/*// 头部*/}
            {/*between = true ===  justify-content: space-between*/}
            <Header between={true}>
                {/*gap =true  === margin-right: 2rem */}
                <HeaderLeft gap={true}>
                    <SoftWareLogo width={'18rem'} color={'rgb(38,132,255)'}/>
                    <h3>project</h3>
                    <h3>user</h3>
                </HeaderLeft>
                <HeaderRight>
                    <Dropdown overlay={<Menu>
                        <Menu.Item key={'logout'}>
                            <a onClick={logout}> 登出</a>
                        </Menu.Item>
                    </Menu>}>
                        {/*防止页面刷新*/}
                        <a onClick={e => e.preventDefault()}>
                            Hi, {user?.name}
                        </a>
                    </Dropdown>

                </HeaderRight>
            </Header>
            {/*// 主体内容*/}
            <Main>
                <ProjectListScreen/>
            </Main>
        </Container>
    )
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

