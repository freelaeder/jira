import {useState} from "react";

// 处理loading error

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
}

// 设置状态的初始值
const defaultInitialState: State<null> = {
    error: null,
    data: null,
    stat: 'idle'
}
// 抛出的异常成为可选的选项
const defaultConfig = {
    thorwOnError: false
}

// custom hook 统一处理 Loading Error状态
export const useAsync = <D>(initialState?: State<D>,initialConfig?: typeof defaultConfig) => {
    // initialState 用户传入的state
    // 用户的initialState 覆盖 默认的 defaultInitialState
    const config = {...defaultConfig,initialConfig}
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })

    //请求成功 保存数据
    const setData = (data: D) => setState({
        data,
        stat: 'success',
        error: null
    })
    //请求失败 处理数据
    const setError = (error: Error) => setState({
        error,
        stat: 'error',
        data: null
    })
    //  用来触发异步请求
    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then()) {
            throw new Error('请传入Promise 类型数据')
        }
        // 更新加载状态 loading
        setState({...state, stat: 'loading'})
        return promise
            .then(data => {
                setData(data)
                return data
            })
            .catch(error => {
                // catch 会消化异常 如果不主动抛出，外面接受不到异常
                setError(error)
                // 同步
                if(config.thorwOnError) return Promise.reject(error)
                // return error 不可以 异步
                return error


            })
    }
    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        ...state
    }

}