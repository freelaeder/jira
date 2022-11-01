// 用户登录之后的界面 入口文件

import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";

export const AuthenticatedApp = () => {
    const {logout} = useAuth()
    return (
        <div>
            {/*// 头部*/}
            <PageHeader>
                <button onClick={logout}>logout</button>
            </PageHeader>
            {/*// 主体内容*/}
            <Main>
                <ProjectListScreen/>
            </Main>

        </div>
    )
}

// 头部
const PageHeader = styled.header`
height: 6rem;
`
// 主体内容
const Main = styled.main`
  height: calc(100vh - 6rem);
`

