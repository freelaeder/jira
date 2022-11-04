import styled from "@emotion/styled";
import {Spin, Typography} from "antd";
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
    <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
</FullPage>