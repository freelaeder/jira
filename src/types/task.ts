export interface Task {
    id: number;
    name: string;
    // 经办人
    processorId: number;
    //项目id
    projectId: number;
    // 任务组
    epicId: number
    kanbanId: number
    // bug or task
    typeId: number;
    note: string;

}