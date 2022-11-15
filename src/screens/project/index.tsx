import React from 'react';
import {Link} from "react-router-dom";
import {Navigate, Route, Routes} from "react-router";
import KanBanScreen from "../Kanban";
import EpicScreen from "../epic";

const ProjectScreen = () => {
    return (
        <div>
            <h1>projectScreen</h1>
            <Link to={'kanban'}>看板</Link>
            <Link to={'epic'}>任务组</Link>
            <Routes>
                <Route path={'/kanban'} element={<KanBanScreen/>}/>
                <Route path={'/epic'} element={<EpicScreen/>}/>
                {/*进入默认显示看板组件*/}
                {/* ./kanban 代表不破坏之前的路径追加 ，因为它是子路由 需要追加在之前的路由上 */}
                {/*  如果直接写 /kanban 会直接在跟路由开始 */}
                {/*  path= '/' 重定向  */}
                <Route path={'/'} element={<Navigate  replace={true} to={'./kanban'}/>}/>

            </Routes>
        </div>
    );
};

export default ProjectScreen;