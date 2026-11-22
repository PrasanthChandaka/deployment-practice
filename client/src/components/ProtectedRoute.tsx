import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/Auth.store";
import type { Role } from "../features/auth/Types";

interface ProtectedRouteProps {
  requiredRoles?: Role[];
}

/**
 * Route guard for protected pages (home, notes, etc.).
 *
 * Rules:
 * - If user not logged in → redirect to /login
 * - If requiredRoles provided and user roles don't match → redirect to /forbidden
 * - Otherwise → render protected content
 */
export const ProtectedRoute = ({ requiredRoles }: ProtectedRouteProps) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = user.roles.some((role) =>
      requiredRoles.includes(role),
    );

    if (!hasRequiredRole) {
      return <Navigate to="/forbidden" replace />;
    }
  }

  return <Outlet />;
};
