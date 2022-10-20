import './App.css';
import {useAuth} from "./context/auth-context";
import {AuthenticatedApp} from "./authenticated-app";
import {UnanthenticatedApp} from "./unanthenticated-app";

function App() {
    // 获取全局状态 
    const {user} = useAuth()
    console.log('user', user)
    return (
        <div className="App">
            {/*判断user 是否存在*/}
            {user ? <AuthenticatedApp/> : <UnanthenticatedApp/>}
        </div>
    );
}

export default App;
