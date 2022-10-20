import {User} from "./screens/project-list/search-panel";
// 导入 服务器地址
const baseUrl = process.env.REACT_APP_API_URL

export interface IAuthParam {
    username: string;
    password: string;
}

 const localStoreageKey = "__auth-provider-token__";

export const getToken = () => localStorage.getItem(localStoreageKey);

 export const handleUserResponse = ({user}: { user: User }) => {
    localStorage.setItem(localStoreageKey, user.token);
    return user;
};

// 登录api实现
export const login = (data: IAuthParam) => {
    return fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(async (res) => {
        if (res && res.ok) {
            // alert('登陆成功')
            return handleUserResponse(await res.json());
        } else {
            return Promise.reject(data);
        }
    });
};

// * // 注册api实现
export const register = (data: IAuthParam) => {
    return fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(async (res) => {
        if (res && res.ok) {
            // alert('注册成功')
            return handleUserResponse(await res.json());
        } else {
            return Promise.reject(data);
        }
    });
};

export const logout = async () => {
    console.log('logout')
    localStorage.removeItem(localStoreageKey);
};