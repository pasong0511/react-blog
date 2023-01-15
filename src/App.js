import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import routes from "./routes";
import Toast from "./components/Toast";
import useToast from "./hooks/toast";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect } from "react";
import { login } from "./store/authSlice";
import { useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
    //리덕스에서 toasts 가져오기
    const toasts = useSelector((state) => state.toast.toasts);
    const { deleteToast } = useToast();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn")) {
            //로컬스토리지에 isLogin이 있는 경우 로그인 유지
            dispatch(login());
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Router>
            <NavBar />
            <Toast toasts={toasts} deleteToast={deleteToast} />
            <div className="container mt-3">
                <Switch>
                    {routes.map((route) => {
                        if (route.auth) {
                            //권한(true)이 있는 경우에 컴포넌트랑, path넘겨줌
                            return (
                                <ProtectedRoute
                                    path={route.path}
                                    component={route.component}
                                    key={route.path}
                                    exact
                                />
                            );
                        }
                        return (
                            <Route
                                key={route.path}
                                exact
                                path={route.path}
                                component={route.component}
                            ></Route>
                        );
                    })}
                </Switch>
            </div>
        </Router>
    );
}

export default App;
