//App.js에서 권한 접근에 사용함
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component, path, key }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if (!isLoggedIn) {
        //로그인이 되었는지 체크 -> 안된 경우 home으로 보냄
        return <Redirect to="/" />;
    }

    return <Route component={component} path={path} key={key} exact />;
};

export default ProtectedRoute;
