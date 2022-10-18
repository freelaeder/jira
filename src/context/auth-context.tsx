import React, {ReactNode, useState} from "react";
// 设置别名
import * as auth from 'auth-provider'
import {User} from "../screens/project-list/search-panel";

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
    const [user, setUser] = useState<User | null>(null);
    // 登录
    // point free
    // const login = (form: auth.IAuthParam) => auth.login(form).then(user => setUser(user));
    const login = (form: auth.IAuthParam) => auth.login(form).then(setUser);
    // 注册
    const register = (form: auth.IAuthParam) => auth.register(form).then(setUser);
    // 退出
    const logout = () => auth.logout().then(() => setUser(null));

    return (
        <AuthContext.Provider
            children={children}
            value={{user, login, register, logout}}
        />
    );
};
// 自定义hook
export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth必须在AuthProvider中使用");
    }
    return context;
};