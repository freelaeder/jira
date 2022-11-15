import React from 'react';
import {IdSelect} from "./id-select";
import {useTaskTypes} from "../utils/task-type";

// 筛选taskType的搜索框
const TaskTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const {data: taskTypes} = useTaskTypes()
    return (
        <IdSelect options={taskTypes || []} {...props} ></IdSelect>
    );
};

export default TaskTypeSelect;