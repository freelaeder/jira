import React, {useState} from 'react';
import {Row, ScreenContainer} from "../../components/lib";
import {useProjectInUrl} from "../Kanban/util";
import {useDeleteEpic, useEpics} from "../../utils/epic";
import {useEpicSearchParams, useEpicsQueryKey} from "./util";
import {Button, List, Modal} from "antd";
import dayjs from "dayjs";
import {useTasks} from "../../utils/task";
import {Link} from "react-router-dom";
import {CreateEpic} from "./create-epic";
import {Epic} from "../../types/epic";
import {useDocumentTitle} from "../../utils";

const EpicScreen = () => {
    // 改变当前title
    useDocumentTitle('任务组', false)
    // 当前的任务名称
    const {data: currentProject} = useProjectInUrl()
    // 获取所有的任务组 集合
    const {data: epics} = useEpics(useEpicSearchParams())
    // 删除
    const {mutate: deleteEpic} = useDeleteEpic(useEpicsQueryKey())
    const confrimEpic = (epic: Epic) => {
        Modal.confirm({
            title: `确定删除项目组 ${epic.name} `,
            content: '确定删除嘛',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                deleteEpic({id: epic.id})
            }
        })
    }
    // 获取tasks
    const {data: tasks} = useTasks({projectId: currentProject?.id})
    // 控制显示
    const [epicCreateOpen, setEpicCreateOpen] = useState(false)
    return (
        <ScreenContainer>
            <h1>{currentProject?.name}任务组</h1>
            <Button type={'link'} onClick={() => setEpicCreateOpen(true)}>创建任务组</Button>
            <List dataSource={epics} itemLayout={'vertical'}
                  style={{overflowY: 'scroll'}}
                  renderItem={
                      epic => <List.Item>
                          {/*元  起源 */}
                          <List.Item.Meta
                              title={<Row between={true}> <span>{epic.name}</span> <Button
                                  onClick={() => confrimEpic(epic)}
                                  type={'link'}> 删除</Button>
                              </Row>}
                              description={
                                  <div>
                                      <div>开始时间{dayjs(epic.start).format('YYYY-MM-DD')}</div>
                                      <div>结束时间{dayjs(epic.end).format('YYYY-MM-DD')}</div>
                                  </div>
                              }
                          />
                          <div style={{display: 'flex', flexDirection: 'column'}}>
                              {tasks?.filter(task => task.epicId === epic.id).map(task => <Link
                                  to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                                  key={task.id}>{task.name}</Link>)}
                          </div>
                      </List.Item>

                  }/>
            <CreateEpic open={epicCreateOpen} onClose={() => setEpicCreateOpen(false)}/>
        </ScreenContainer>
    );
};

export default EpicScreen;