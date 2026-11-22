type User = {
  id: string;
  username: string;
  roles: Role[];
};

export interface AuthResponse {
  message: string;
  accessToken: string;
  user: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export type Role = "Admin" | "Manager" | "Employee";

export interface SignUpRequest {
  username: string;
  password: string;
  roles: Role[];
}

export interface SignUpResponse {
  message: string;
}

/**
 * Route role requirements for RBAC (Role-Based Access Control).
 * Maps route paths to required roles.
 * If a user has ANY of the required roles, they can access the route.
 */
export type RouteRoleRequirement = {
  [route: string]: Role[];
};
