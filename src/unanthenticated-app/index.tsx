// 用户未登录的页面 入口文件

import {useState} from "react";
import RegisterScreen from "./register";
import LoginScreen from "./login";

export const UnanthenticatedApp = () => {
    // 定义在 login 和 register 之间切换的状态
    // 默认登录界面
    const [IsRegister, SetIsRegister] = useState(false)
    return (
        <div>
            {
                IsRegister ? <RegisterScreen/> : <LoginScreen/>
            }
            {/*    按钮点击切换*/}
            <button onClick={() => SetIsRegister(!IsRegister)}>change status</button>
        </div>
    )

}