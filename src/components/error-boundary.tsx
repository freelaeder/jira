import React, {Component} from "react";

//https://zh-hans.reactjs.org/docs/error-boundaries.html#introducing-error-boundaries

// ReactElement === jsx
type FallbackRender = (props: { error: Error | null }) => React.ReactElement
// 简单处理错误边界
// 一种写法   每次写 children
// export class ErrorBoundary extends Component<{ children: ReactNode, fallbackRender: FallbackRender }> {
//
// }
// 第二种  PropsWithChildren ==  object.assign
export class ErrorBoundary extends Component<React.PropsWithChildren<{ fallbackRender: FallbackRender }>, { error: Error | null }> {

    state = {
        // 错误信息
        error: null
    }

    // 当 ErrorBoundary 子组件发生异常 产生的error 会赋值给 state 中的 error
    /**
     * 引自 官网 https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromerror
     * 此生命周期会在后代组件抛出错误后被调用。
     * 它将抛出的错误作为参数，并返回一个值以更新 state
     * */
    static getDerivedStateFromError(error: Error) {
        return {error}
    }

    render() {
        const {error} = this.state
        const {fallbackRender, children} = this.props
        // 如果有error
        if (error) {
            return fallbackRender({error})
        }
        // 正常渲染
        return children;
    }
}