
// 高亮显示关键字
// name 名字 keyword 搜索的关键字
export const Mark = ({name, keyword}: { name: string, keyword: string }) => {
    // 如果没有keyword
    if (!keyword) {
        return <> {name}</>
    }
    // 如果有
    const arr = name.split(keyword)
    return <> {
        arr.map((str, index) => <span key={index}>
            {str}
            {index === arr.length - 1 ? null : <span style={{color: '#257AFD',fontSize:'18px'}}> {keyword} </span>}
        </span>)
    } </>

}