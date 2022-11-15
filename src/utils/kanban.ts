// 获取看板列表
import {useHttp} from "./http";
import {QueryKey, useMutation, useQuery} from "react-query";
import {Kanban} from "../types/kanban";
import {Project} from "../types/project";
import {useAddConfig} from "./use-optimistic-options";

export const useKanbans = (param?: Partial<Kanban>) => {
    const client = useHttp()
    // 只要param 发送变化 就重新获取
    return useQuery<Kanban[]>(
        ['kanbans', param],
        () => client('kanbans', {data: param}),
    )
}

// 添加新的 看板
export const useAddKanban = (queryKey: QueryKey) => {
    const client = useHttp()
    // id 编辑的信息
    return useMutation(
        (params: Partial<Kanban>) =>
            client(`kanbans`, {
                data: params,
                method: 'POST'
            }),
        useAddConfig(queryKey)
    )
}
