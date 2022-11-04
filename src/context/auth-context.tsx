import React, {ReactNode, useState} from "react";
// 设置别名
import * as auth from 'auth-provider'
import {User} from "../screens/project-list/search-panel";
import {http} from 'utils/http'
import {useMount} from "../utils";
import {useAsync} from "../utils/use-async";
import {FullPageErrorFallback, FullPageLoading} from "../components/lib";
// 初始化user
// 解决 用户登录页面刷新  退出问题
const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    // 如果找到token 发送请求 获取user信息
    if (token) {
        const data = await http('me', {token})
        user = data.user
    }
    return user
}


// 创建 context
// https://zh-hans.reactjs.org/docs/context.html#gatsby-focus-wrapper
const AuthContext = React.createContext<| {
    user: User | null;
    login: (form: auth.IAuthParam) => Promise<void>;
    register: (form: auth.IAuthParam) => Promise<void>;
    logout: () => Promise<void>;
}
    | undefined>(undefined);
// 设置别名
AuthContext.displayName = "AuthContext";
// 逻辑处理
export const AuthProvider = ({children}: { children: ReactNode }) => {
    // 用户信息
    const {data: user, error, isLoading, isIdle, isError, run, setData: setUser} = useAsync<User | null>()
    // 登录
    // point free
    const login = (form: auth.IAuthParam) => auth.login(form).then(setUser);
    // 注册
    const register = (form: auth.IAuthParam) => auth.register(form).then(setUser);
    // 退出
    const logout = () => auth.logout().then(() => setUser(null));
    // 页码加载调用
    // 解决 用户登录页面刷新  退出问题
    useMount(() => {
        // bootstrapUser 从location 中 找token
        // 能找到 发送请求到me 请求user信息
        run(bootstrapUser())
    })
    // 加载中展示loading
    if(isIdle || isLoading){
        return <FullPageLoading />
    }
    // 当发生错误
    if(isError){
        return <FullPageErrorFallback error={error} />
    }
    return (
        <AuthContext.Provider
            children={children}
            value={{user, login, register, logout}}
        />
    );
};
// 自定义hook
//https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext
export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth必须在AuthProvider中使用");
    }
    return context;
};