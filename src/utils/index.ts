// 在一个函数中 改变传入的对象 本身是不好的
// 排除value 为 0 的情况
// !! 把一个值 转化为 boolean值
import {useEffect, useState} from "react";

export const isFasy = (value: unknown) => value === 0 ? false : !value
// cleanObject 会清空 value 为空的 key 返回新的 对象
// @ts-ignore
export const cleanObject = (object: object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        // 属性值
        // console.log(key,'key-----')
        // console.log(result[key],'value---')
        // @ts-ignore
        const value = result[key]
        // 如果 这个value 不存在 删除
        // 不排除 0
        if (isFasy(value)) {
            // @ts-ignore
            delete result[key]
        }
    })
    return result
}

// custom Hook

/**
 * 定义custom hook时名字必须以use开头，
 * 否则eslint会报错，因为不管是自己定义的hook还是react自带的hook
 * 都只能在组件中或其他hook中运行
 * deps:[] 只在挂载销毁执行一次
 * 。 */
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    }, [])
}

// debounce 减少请求次数
// export const debounce = (func,delay) => {
//     // 定义timer
//     let timer;
//     return () => {
//         // 如果timer 存在 删除上一次定时器
//         if(timer) return
//         timer = setTimeout(()=>{
//             func()
//         },delay)
//     }
// }
export const useDebounce = <V>(value: V, delay?: number ) => {
    const [debounceValue, setDebounce] = useState(value)
    useEffect(() => {
        // 每次在value变化后 设置一个定时器
        const timerout = setTimeout(() => setDebounce(value), delay)
        // 在上一个useEffect 执行完之后执行
        return () => clearTimeout(timerout)
    }, [value, delay])
    return debounceValue
}

const useArray = <T>(initialArray:T[]) =>{
    const [value,setValue] = useState(initialArray)
    return {
        value,
        setValue,
        add:(item:T) => setValue([...value,item]),
        clear:() =>setValue([]),
        removeIndex:(index:number) => {
            const copy = [...value]
            copy.splice(index,1)
            setValue(copy)

        }
    }
}