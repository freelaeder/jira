import {useState} from "react";


export const useUndo = <T>(initialPresent:T) => {
    // 记录历史操作合集
    const [past,setPast] = useState<T[]>([])
    // 当前
    const [present,setPresent] = useState(initialPresent)
    const [future,setFuture] = useState<T[]>([])
    const canUndo = past.length !== 0
    const canRedo = future.length !== 0

}