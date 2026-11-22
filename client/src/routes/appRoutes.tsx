import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import authRoutes from "./authRoutes";
import noteRoutes from "./noteRoutes";
import { ProtectedRoute } from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import ForbiddenPage from "../pages/ForbiddenPage";
import { settingRoutes } from "./settingRoutes";
import { chatRoutes } from "./chatRoutes";

const appRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          ...noteRoutes,
          ...settingRoutes,
          ...chatRoutes,
          {
            path: "page-not-found",
            element: <NotFoundPage />,
          },
          {
            path: "*",
            element: <Navigate to="/page-not-found" replace />,
          },
          {
            path: "forbidden",
            element: <ForbiddenPage />,
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [...authRoutes],
      },
    ],
  },
];

export default appRoutes;
