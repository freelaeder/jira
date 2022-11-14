import {Project} from "../screens/project-list/list";
import {useHttp} from "./http";
import {useMutation, useQuery, useQueryClient} from "react-query";

// 获取项目列表
export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    // 只要param 发送变化 就重新获取
    return useQuery<Project[]>(
        ['projects', param],
        () => client('projects', {data: param})
    )
}

// 编辑收藏的状态
// export const useEditProject = () => {
//     const {run, ...asyncResult} = useAsync<Project[]>();
//     const httpFetch = useHttp();
//     const mutate = (params: Partial<Project>) => {
//         return httpFetch(`projects/${params.id}`, {
//             data: params,
//             method: "PATCH",
//         })
//     }
//     return {
//         mutate,
//         ...asyncResult
//     }
// }

// 编辑收藏的状态 使用react-query
export const useEditProject = () => {
    const client = useHttp();
    const queryClient = useQueryClient()
    // 当更新成功之后就重新刷新缓存 projects
    return useMutation(
        (params: Partial<Project>) => client(`projects/${params.id}`, {
            method: 'PATCH',
            data: params
        }), {onSuccess: () => queryClient.invalidateQueries('projects')})

}

// 添加收藏的状态
export const useAddProject = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    // id 编辑的信息
    return useMutation(
        (params: Partial<Project>) =>
            client(`projects`, {
                data: params,
                method: 'POST'
            }),
        {onSuccess: () => queryClient.invalidateQueries('projects')}
    )
}

// 获取项目列表的详情
export const useProject = (id?: number) => {
    const client = useHttp()
    return useQuery<Project>(
        ['project', {id}],
        () => client(`projects/${id}`),
        {
            // 只有当id 有值的时候触发
            enabled: Boolean(id)
        }
    )
}