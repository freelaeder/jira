import './App.css';
// hook
import {useAuth} from "./context/auth-context";
import {AuthenticatedApp} from "./authenticated-app";
import {UnanthenticatedApp} from "./unanthenticated-app";
import {ErrorBoundary} from "./components/error-boundary";
import {FullPageErrorFallback} from "./components/lib";

function App() {
    // 获取全局状态 
    const {user} = useAuth()
    return (
        <div className="App">
            {/*使用错误边界 fallbackRender发生错误显示的组件   */}
            <ErrorBoundary fallbackRender={FullPageErrorFallback}>
                {/*判断user 是否存在*/}
                {user ? <AuthenticatedApp/> : <UnanthenticatedApp/>}
            </ErrorBoundary>
        </div>
    );
}

export default App;
