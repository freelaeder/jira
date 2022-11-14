import styled from "@emotion/styled";
import {Button, Spin, Typography} from "antd";
import {DevTools} from "jira-dev-tool";
import React from "react";

// css 样式增强
export const Row = styled.div<{
    gap?: number | boolean,
    between?: boolean,
    marginBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.between ? 'space-between' : undefined};
  margin-bottom: ${props => props.marginBottom + 'rem'};

  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
  }

`

// loading组件
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const FullPageLoading = () => <FullPage>
    <Spin size={'large'}/>
</FullPage>

// 错误信息
export const FullPageErrorFallback = ({error}: { error: Error | null }) => <FullPage>
    <ErrorBox error={error}/>
    <DevTools/>
</FullPage>

//没有padding 的button
export const ButtonNoPadding = styled(Button)`
  padding: 0;
`
// 类型守卫 当value有message 就推断 是Error类型
const isError = (value: any): value is Error => value?.message
// 设置error 盒子
export const ErrorBox = ({error}: { error: unknown }) => {
    // 推断error 类型 当isError(error) 返回true error 就是 Error 类型
    if (isError(error)) {
        return <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
    }
    return null
}