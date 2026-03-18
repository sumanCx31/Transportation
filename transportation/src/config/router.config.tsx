import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../components/layout/authLayout/authLayout";
import LoginForm from "../components/loginForm";
import AdminPage from "../components/layout/adminLayout/adminLayout";
import Dashboard from "../pages/admin/dashboardPage";
import NotFoundPage from "../pages/not-found-page";
import BookingsPage from "../pages/admin/bookingPage";
import RegisterForm from "../components/registerForm";

import { Toaster } from "sonner";
import ManageBus from "../pages/admin/manageBus";
import AddBus from "../pages/admin/addBus";
import Activate from "../components/activate";
import Users from "../pages/admin/users";
import viewRoutes from "../pages/admin/viewRoutes";
import DriverPage from "../components/layout/adminLayout/driverLayout";
import DriverDashboard from "../pages/driver/dashboardPage";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { index: true, Component: LoginForm },
      { path: "register", Component: RegisterForm },
      { path: "activate/:token", Component: Activate },
    ],
  },
  {
    path: "/admin",
    Component: AdminPage,
    children: [
      { index: true, Component: Dashboard },
      { path: "bookings", Component: BookingsPage },
      { path: "manage-buses", Component: ManageBus },
      { path: "manage-buses/add-bus", Component: AddBus },
      { path: "manage-buses/view-routes/:busId", Component: viewRoutes },
      { path: "users", Component: Users },
    ],
  },
  {
    path:"/driver",
    Component:DriverPage,
    children:[{
      index:true,element:<DriverDashboard/>
    },
  {path:"trip-update",Component:AddBus}]
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

const RouterConfig = () => {
  return (
    <>
      <Toaster richColors closeButton />
      <RouterProvider router={routerConfig} />
    </>
  );
};
export default RouterConfig;
