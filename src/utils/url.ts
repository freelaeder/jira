import {URLSearchParamsInit, useSearchParams} from "react-router-dom";
import {useMemo} from "react";
import {cleanObject} from "./index";

/**
 * react-router react-hook
 * 返回当前页面url中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    // searchParams.get 获取url参数
    const [searchParams] = useSearchParams()
    const setSearchParams = useSetUrlSearchParam()
    return [
        /**
         * 把“创建”函数和依赖项数组作为参数传入 useMemo，
         * 它仅会在某个依赖项改变时才重新计算 memoized 值。
         * 这种优化有助于避免在每次渲染时都进行高开销的计算
         * */
        useMemo(
            () => keys.reduce((prev, key) => {
                return {...prev, [key]: searchParams.get(key) || ''}
            }, {} as { [key in K]: string }),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [searchParams]),
        (params: Partial<{ [key in K]: unknown }>) => {
            return setSearchParams(params)
        }
    ] as const
}

// const a = ['1', 2, {gender: '女'}] as const

export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParam] = useSearchParams()
    return (params:{[key in string ]: unknown}) => {
        const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit
        return setSearchParam(o)
    }
}