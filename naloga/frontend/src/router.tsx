import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import UsersPage from "./pages/users";
import NotFound from "./pages/not-found";
import DefaultLayout from "./components/default-layout";
import GuestLayout from "./components/guest-layout";
import DashboardPage from "./pages/dashboard";
import UserForm from "./pages/user-form";

// usmerjevalnik z uporabo React Router-doma
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/users/new",
        element: <UserForm key="create" />,
      },
      {
        path: "/users/:id",
        element: <UserForm key="update" />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
