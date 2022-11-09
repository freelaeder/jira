import {useAsync} from "./use-async";
import {Project} from "../screens/project-list/list";
import {useEffect} from "react";
import {cleanObject} from "./index";
import {useHttp} from "./http";

// 获取项目列表
export const useProjects = (param?: Partial<Project>) => {
    // 使用 useHttp
    const client = useHttp()
    // 使用use async
    const {run, ...result} = useAsync<Project[]>()
    // 发送请求 获取projects
    useEffect(() => {
        run(client('projects', {data: cleanObject(param || {})}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])
    return result
}

// 编辑收藏的状态
export const useEditProject = () => {
    const { run, ...asyncResult } = useAsync<Project[]>();
    const httpFetch = useHttp();
    const mutate = (params: Partial<Project>) => {
        return httpFetch(`projects/${params.id}`, {
            data: params,
            method: "PATCH",
        })
    }
    return {
        mutate,
        ...asyncResult
    }
}

// 添加收藏的状态
export const useAddProject = () => {
    const {run, ...asyncResult} = useAsync()
    const client = useHttp()
    // id 编辑的信息
    const mutate = (params: Partial<Project>) => {
        run(client(`projects/${params.id}`, {
            data: params,
            method: 'POST'
        }))
    }

    return {mutate, ...asyncResult}
}