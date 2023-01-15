//App.js에서 권한 접근에 사용함
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if (!isLoggedIn) {
        //로그인이 되었는지 체크 -> 안된 경우 home으로 보냄
        return <Navigate to="/" />;
    }

    return element;
};

export default ProtectedRoute;
