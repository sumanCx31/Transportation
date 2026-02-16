import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../components/layout/authLayout";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";
import AdminPage from "../pages/adminPage";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    Component: AuthLayout,
    children: [
        {index:true, Component: LoginForm},
        {path:"register", Component:RegisterForm}
    ]
  },
  {path:"/admin",   Component:AdminPage},
  {
    path: "*",
    Component: () => <div>404 Not Found</div>,
  },
]);

const RouterConfig = () => {
  return (
    <>
      <RouterProvider router={routerConfig} />
    </>
  );
};
export default RouterConfig;
