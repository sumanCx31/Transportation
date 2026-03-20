import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../components/layout/authLayout/authLayout";
import LoginForm from "../components/auth/loginForm";
import AdminPage from "../components/layout/adminLayout/adminLayout";
import Dashboard from "../pages/admin/dashboardPage";
import NotFoundPage from "../pages/not-found-page";
import BookingsPage from "../pages/admin/bookingPage";
import RegisterForm from "../components/auth/registerForm";

import { Toaster } from "sonner";
import ManageBus from "../pages/admin/manageBus";
import AddBus from "../pages/admin/addBus";
import Activate from "../components/auth/activate";
import Users from "../pages/admin/users";
import viewRoutes from "../pages/admin/viewRoutes";
import DriverPage from "../components/layout/adminLayout/driverLayout";
import DriverDashboard from "../pages/driver/dashboardPage";
import AddTripForm from "../pages/driver/addBus";
import SuvYatraTripForm from "../pages/driver/addBus";
import { AuthProvider } from "../context/auth.context";

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
  {path:"trip-update",Component:SuvYatraTripForm}]
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

const RouterConfig = () => {
  return (
    <>
     <AuthProvider>
       <Toaster richColors closeButton />
      <RouterProvider router={routerConfig} />
     </AuthProvider>
    </>
  );
};
export default RouterConfig;
