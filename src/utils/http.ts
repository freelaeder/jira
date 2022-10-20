import qs from "qs"
import * as auth from 'auth-provider'
import {useAuth} from "../context/auth-context";
// 导入 服务器地址
const apiUrl = process.env.REACT_APP_API_URL

// 定义新的接口 继承 RequestInit
interface Config extends RequestInit {
    token?: string,
    data?: object
}

// endpoint 就是 `${baseUrl}/中的 -》 register`
// fetch 不会抛出异常  axios 会抛出异常 返回状态
// 当参数有默认值 会自动变成可选属性
export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
    const config = {
        // 默认get
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '',
        },
        ...customConfig
    }
    // 处理参数
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data)
    }

    return window.fetch(`${apiUrl}/${endpoint}`, config)
        .then(
            async response => {
                if (response.status === 401) {
                    await auth.logout()
                    // 页码刷新
                    window.location.reload()
                    // 抛出异常
                    return Promise.reject({message: '请重新登录'})
                }
                const data = await response.json()
                if (response.ok) {
                    return data
                } else {
                    return Promise.reject(data)
                }
            }
        )
}

export const useHttp = () => {
    const {user} = useAuth()
    // return ([endpoint,config]:[string,Config]) => http(endpoint,{...config,token:user?.token})
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}