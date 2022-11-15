// 获取看板列表
import {useHttp} from "./http";
import {useQuery} from "react-query";
import {Kanban} from "../types/kanban";

export const useKanbans = (param?: Partial<Kanban>) => {
    const client = useHttp()
    // 只要param 发送变化 就重新获取
    return useQuery<Kanban[]>(
        ['kanbans', param],
        () => client('kanbans', {data: param}),
    )
}