import type { RouteObject } from "react-router-dom";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";

const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <SignInPage />,
  },
  {
    path: "signup",
    element: <SignUpPage />,
  },
];

export default authRoutes;
