// 用户登录之后的界面 入口文件

import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";

export const AuthenticatedApp = () => {
    const {logout} = useAuth()
    return (
        <div>
            <ProjectListScreen/>
            <button onClick={logout}>logout</button>
        </div>
    )
}
