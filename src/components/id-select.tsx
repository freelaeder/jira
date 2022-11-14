import {Raw} from "../types";
import {Select} from "antd";
import React from "react";


/**
 * Raw === string | number
 * SelectProps 从原有select组件 拿来所有的类性
 * */
type SelectProps = React.ComponentProps<typeof Select>

// 删除SelectProps 原有的value onChange options
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    value?: Raw | null | undefined,
    onChange?: (value?: number) => void,
    defaultOptionName?: string,
    options?: { name: string, id: number }[]
}

/**
 * value 可以传入多种类型的值
 * onChange 把值往外传递的时候，会把值全部变为number| undefined
 * 当isNan(Number(value)) 为true 代表选择默认类型
 * 当选择为0 返回 undefined
 * 当选择默认类型时，onChange会回调undefined
 * ...restProps SelectProps 剩余的属性
 * */
export const IdSelect = (props: IdSelectProps) => {
    const {value, onChange, defaultOptionName, options, ...restProps} = props

    return <Select {...restProps} value={options?.length ? toNumber(value) : 0}
                   onChange={value => onChange?.(toNumber(value) || undefined)}>
        {
            defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
        }
        {
            options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
        }

    </Select>
}

// 把传入的多种类型变化为 一种类型 number 把没有意义的值转化为 0
/**
 * NaN === NaN;        // false
 * Number.NaN === NaN; // false
 * isNaN(NaN);         // true
 * isNaN(Number.NaN);  // true
 * */
const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)
