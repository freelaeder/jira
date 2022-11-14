import {useUrlQueryParam} from "../../utils/url";
import {useMemo} from "react";
import {useProject} from "../../utils/project";
import {useSearchParams} from "react-router-dom";


//url 项目列表搜索的参数
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

//在url中展示项目编辑的状态
export const useProjectModal = () => {
    // 从url读取的所有数据都是字符串
    // 创建状态
    const [{projectCreate}, setProjectCreate] = useUrlQueryParam(['projectCreate'])
    // 编辑状态
    const [{editingProjectId}, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
    const {data: editingProject, isLoading} = useProject(Number(editingProjectId))
    // 打开状态
    const open = () => setProjectCreate({projectCreate: true})

    const [_, setUrlParams] = useSearchParams();
    const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
    // 关闭状态
    // const close = () => {
    //     setProjectCreate({projectCreate: undefined})
    //     setEditingProjectId({editingProjectId: undefined})
    // }

    const startEdit = (id: number) => {
       setEditingProjectId({editingProjectId: id})
    }

    return {
        projectModalOpen: projectCreate == 'true' || Boolean(editingProject),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
}