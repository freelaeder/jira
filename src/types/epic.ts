
export interface Epic {
    id:number;
    name:string;
    // epic 属于那个工程
    projectId:number;
    // 开始时间
    start:number;
    // 结束时间
    end:number

}