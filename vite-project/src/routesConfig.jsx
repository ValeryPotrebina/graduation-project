import Home from "./shared/Home";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
export const routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
];