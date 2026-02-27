import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../components/layout/authLayout/authLayout";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";
import AdminPage from "../components/layout/adminLayout/adminLayout";
import Dashboard from "../pages/admin/dashboardPage";
import NotFoundPage from "../pages/not-found-page";
import BookingsPage from "../pages/admin/bookingPage";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    Component: AuthLayout,
    children: [
        {index:true, Component: LoginForm},
        {path:"register", Component:RegisterForm}
    ]
  },
  {
    path:"/admin",
    Component:AdminPage, 
    children:[
    {index:true, Component:Dashboard},
    {path:"bookings", Component:BookingsPage}
  ]},
  {
    path: "*",
    Component: NotFoundPage,
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
