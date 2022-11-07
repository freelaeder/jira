import {useUrlQueryParam} from "../../utils/url";
import {useMemo} from "react";


// 项目列表搜索的参数
export const useProjectsSearchParams = () => {

    // 获取当前页面url参数
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    // 转化 param 把personId 转化为 number
    return [
        // 此处返回新数组 会造成无限循环
        useMemo(() => ({...param, personId: Number(param.personId) || undefined}), [param]),
        setParam
    ] as const
}