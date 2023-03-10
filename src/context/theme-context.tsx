import {createContext, ReactNode, useContext, useEffect, useState} from "react";
// 创建context
const ThemeContext = createContext<| {
    preFix:string;
    changeTheme: () =>void;
} | undefined>(undefined);
// 设置别名
ThemeContext.displayName = 'ThemeContext'

// 逻辑处理
export const ThemeProvider = ({children}: { children: ReactNode }) => {
    //设置主题
    const [preFix, setPrefix] = useState('ant')
    //修改主题
    const changeTheme = () => {
        preFix === 'ant' ? setPrefix('custom') : setPrefix('ant')
    }
    useEffect(() => {
        console.log(preFix)
    }, [preFix])

    return (
        <ThemeContext.Provider value={{preFix, changeTheme}} children={children} />
    )
}

//custom hook
export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) throw new Error("useTheme 必须在ThemeContext中使用")
    return context
}