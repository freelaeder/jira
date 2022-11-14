import { QueryKey, useQueryClient } from "react-query"

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
            return { previousItems };
        },
        onError: (error: Error, newItem: any, context: any) => {
            // 修改失败，回滚数据
            queryClient.setQueryData(queryKey, context.previousItems);
        },
    }
}

export const useEditConfig = (queryKey: QueryKey) => useConfig(queryKey,
    (target, old) => old?.map((item) => item.id === target.id ? { ...item, ...target } : item ) || []
)

export const useDeleteConfig = (queryKey: QueryKey) => useConfig(queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
)

export const useAddConfig = (queryKey: QueryKey) => useConfig(queryKey,
    (target, old) => (old ? [...old, target] : [target])
)

export default useConfig