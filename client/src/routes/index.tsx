import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import User from "./../pages/User/User";
import Layout from "../components/layouts/layout";
import AuthMiddleware from "@/middleware/AuthMiddleware";

export const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    element: (
      <AuthMiddleware>
        <Layout />
      </AuthMiddleware>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <User />,
      },
    ],
  },
];
