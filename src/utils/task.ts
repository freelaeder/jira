
// 获取任务列表
import {useHttp} from "./http";
import {QueryKey, useMutation, useQuery} from "react-query";
import {Task} from "../types/task";
import {Kanban} from "../types/kanban";
import {useAddConfig} from "./use-optimistic-options";

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
