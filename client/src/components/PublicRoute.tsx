import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/Auth.store";

/**
 * Route guard for public pages (login, signup).
 *
 * Rules:
 * - If user is logged in → redirect to home (/)
 * - Otherwise → render login/signup pages
 */
const PublicRoute = () => {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
