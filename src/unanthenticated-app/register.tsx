import React, {FormEvent, useEffect} from 'react';
import {useAuth} from "../context/auth-context";

// 注册界面

const RegisterScreen = () => {
    // 调用自定义hook  获取全局状态
    const {register, user} = useAuth()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        // 阻止默认行为
        event.preventDefault()
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        console.log(username, password)
        register({username, password})
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">username</label>
                <input type="text " id={'username'}/>
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input type="text " id={'password'}/>
            </div>
            <button type={"submit"}>regsiter</button>
        </form>
    );
};

export default RegisterScreen;