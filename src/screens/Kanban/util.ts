import {useLocation} from "react-router";
import {useProject} from "../../utils/project";
import {useUrlQueryParam} from "../../utils/url";
import {useMemo} from "react";

// 获取url中的id projects/1/....
export const useProjectIdInUrl = () => {
    // pathname 是一个字符串
    const {pathname} = useLocation()
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}
// 获取项目列表的详情使用useProjectIdInUrl返回的id
export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({projectId: useProjectIdInUrl()})
// 看板请求的querykey
export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTasksSearchParams = () => {
    const [param, setParam] = useUrlQueryParam([
        'name',
        'typeId',
        'processorId',
        'tagId'
    ])
    const projectId = useProjectIdInUrl()
    return useMemo(
        () => ({
            projectId,
            typeId: Number(param.typeId) || undefined,
            processorId: Number(param.processorId) || undefined,
            tagId: Number(param.tagId) || undefined,
            name: param.name
        }), [projectId, param]
    )


}
// 任务请求的querykey
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]