import {User} from "../screens/project-list/search-panel";
import {cleanObject} from "./index";
import {useHttp} from "./http";
import {useAsync} from "./use-async";
import {useEffect} from "react";

// 获取用户
export const useUsers = (param?: Partial<User>) => {
    const client = useHttp()
    const {run, ...result} = useAsync<User[]>()
    // 发送请求 获取用户
    useEffect(() => {
        run(client('users', {data: cleanObject(param || {})}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])
    return result
}