// 在一个函数中 改变传入的对象 本身是不好的
// 排除value 为 0 的情况
// !! 把一个值 转化为 boolean值
export const isFasy = (value) => value === 0 ? false : !value
// cleanObject 会清空 value 为空的 key 返回新的 对象
export const cleanObject = (object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key]
        // 如果 这个value 不存在 删除
        // 排除 0
        if (isFasy(value)) {
            delete result[key]
        }
    })
    return result
}