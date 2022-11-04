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