import {QueryKey, useQueryClient} from "react-query"
import {reorder} from "./reorder";
import {Task} from "../types/task";

// 生成乐观更新
const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
    const queryClient = useQueryClient();
    return {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        onMutate: async (target: any) => {
            // 乐观更新
            const previousItems = queryClient.getQueryData(queryKey);
            queryClient.setQueryData(queryKey, (old?: any[]) => {
                return callback(target, old)
            });
            return {previousItems};
        },
        onError: (error: Error, newItem: any, context: any) => {
            // 修改失败，回滚数据
            queryClient.setQueryData(queryKey, context.previousItems);
        },
    }
}

export const useEditConfig = (queryKey: QueryKey) => useConfig(queryKey,
    (target, old) => old?.map((item) => item.id === target.id ? {...item, ...target} : item) || []
)

export const useDeleteConfig = (queryKey: QueryKey) => useConfig(queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
)

export const useAddConfig = (queryKey: QueryKey) => useConfig(queryKey,
    (target, old) => (old ? [...old, target] : [target])
)

export default useConfig

//拖拽 乐观更新

export const useReorderKanbanConfig = (queryKey: QueryKey) =>
    useConfig(queryKey, (target, old) => reorder({list: old, ...target}));

export const useReorderTaskConfig = (queryKey: QueryKey) =>
    useConfig(queryKey, (target, old) => {
        const orderedList = reorder({list: old, ...target}) as Task[];
        return orderedList.map((item) =>
            item.id === target.fromId
                ? {...item, kanbanId: target.toKanbanId}
                : item
        );
    });
