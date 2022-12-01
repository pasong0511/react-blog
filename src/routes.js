import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";

//컴포넌트도 배열 -object에 저장할 수 있다.
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
        path: "/blogs/create",
        component: CreatePage,
    },
    {
        path: "/blogs/edit",
        component: EditPage,
    },
];

export default routes;
