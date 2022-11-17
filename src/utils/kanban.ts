// 获取看板列表
import {useHttp} from "./http";
import {QueryKey, useMutation, useQuery} from "react-query";
import {Kanban} from "../types/kanban";
import {
    useAddConfig,
    useDeleteConfig,
    useReorderKanbanConfig,
} from "./use-optimistic-options";

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


// 删除看板
export const useDeleteKanban = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        ({id}: { id: number }) => client(`kanbans/${id}`, {method: "DELETE"}),
        useDeleteConfig(queryKey)
    )
}

// 拖拽传入的东西
export interface SortProps {
    // 要重新排序的item
    fromId: number;
    // 目标item
    referenceId: number;
    // 放在目标item 的前还是后
    type: 'before' | "after";
    fromKanbanId?: number;
    toKanbanId?: number;


}


// 拖拽持久化 拖拽看板
export const useReorderKanban = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        (params: SortProps) => {
            return client('kanbans/reorder', {
                data: params,
                method: 'POST'
            })
        },
        useReorderKanbanConfig(queryKey)
    )

}
