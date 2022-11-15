
// 获取任务列表
import {useHttp} from "./http";
import {useQuery} from "react-query";
import {Task} from "../types/task";

export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp()
    // 只要param 发送变化 就重新获取
    return useQuery<Task[]>(
        ['tasks', param],
        () => client('tasks', {data: param}),
    )
}