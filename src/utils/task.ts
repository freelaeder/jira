// 获取任务列表
import {useHttp} from "./http";
import {QueryKey, useMutation, useQuery} from "react-query";
import {Task} from "../types/task";
import {Kanban} from "../types/kanban";
import {useAddConfig, useDeleteConfig, useEditConfig} from "./use-optimistic-options";
import {Project} from "../types/project";

export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp()
    // 只要param 发送变化 就重新获取
    return useQuery<Task[]>(
        ['tasks', param],
        () => client('tasks', {data: param}),
    )
}

// 添加新的一个任务 task
export const useAddTask = (queryKey: QueryKey) => {
    const client = useHttp()
    // id 编辑的信息
    return useMutation(
        (params: Partial<Task>) =>
            client(`tasks`, {
                data: params,
                method: 'POST'
            }),
        useAddConfig(queryKey)
    )
}

// 获取task任务的详情
export const useTask = (id?: number) => {
    const client = useHttp()
    return useQuery<Task>(
        ['task', {id}],
        () => client(`tasks/${id}`),
        {
            // 只有当id 有值的时候触发
            enabled: Boolean(id)
        }
    )
}

// 编辑task 任务的状态 使用react-query
export const useEditTask = (queryKey: QueryKey) => {
    const client = useHttp();
    // 当更新成功之后就重新刷新缓存 projects
    return useMutation(
        (params: Partial<Task>) => client(`tasks/${params.id}`, {
            method: 'PATCH',
            data: params
        }),
        useEditConfig(queryKey)
    )

}

// 删除task
export const useDeleteTask = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        ({id}: { id: number }) => client(`tasks/${id}`, {method: "DELETE"}),
        useDeleteConfig(queryKey)
    )
}
