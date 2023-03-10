import {useHttp} from "./http";
import {User} from "../types/user";
import {useQuery} from "react-query";

// 获取用户
// export const useUsers = (param?: Partial<User>) => {
//     const client = useHttp()
//     const {run, ...result} = useAsync<User[]>()
//     // 发送请求 获取用户
//     useEffect(() => {
//         run(client('users', {data: cleanObject(param || {})}))
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [param])
//     return result
// }

export const useUsers = (param?: Partial<User>) => {
    const client = useHttp()
    return useQuery<User[]>(['users', param], () => client(
        'users', {data: param}))
}