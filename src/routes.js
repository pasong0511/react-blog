import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";
import AdminPage from "./pages/AdminPage";
import ShowPage from "./pages/ShowPage";
import NotFoundPage from "./pages/NotFoundPage";

//컴포넌트도 배열 -object에 저장할 수 있다.
//라우트 순서가 중요하다.
const routes = [
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/blogs",
        element: <ListPage />,
    },
    {
        path: "/admin",
        element: <AdminPage />,
        auth: true, //로그인 권한있어야 접근 가능
    },
    {
        path: "/blogs/create",
        element: <CreatePage />,
        auth: true, //로그인 권한있어야 접근 가능
    },
    {
        path: "/blogs/:id/edit",
        element: <EditPage />,
        auth: true, //로그인 권한있어야 접근 가능
    },
    {
        path: "/blogs/:id",
        element: <ShowPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

export default routes;
