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
        component: HomePage,
    },
    {
        path: "/blogs",
        component: ListPage,
    },
    {
        path: "/admin",
        component: AdminPage,
        auth: true,
    },
    {
        path: "/blogs/create",
        component: CreatePage,
        auth: true,
    },
    {
        path: "/blogs/:id/edit",
        component: EditPage,
        auth: true,
    },
    {
        path: "/blogs/:id",
        component: ShowPage,
    },
    {
        path: "*",
        component: NotFoundPage,
    },
];

export default routes;
