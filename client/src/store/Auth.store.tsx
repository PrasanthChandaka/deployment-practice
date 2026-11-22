import { create } from "zustand";
import { markLoggedOut, clearLoggedOutFlag } from "../lib/authPersistence";

type Role = "Admin" | "Manager" | "Employee";

type User = {
  id: string;
  username: string;
  roles: Role[];
};

type AuthState = {
  token: string | null;
  user: User | null;
  isLoggedOut: boolean;
  setAuth: (data: { token: string; user: User }) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoggedOut: false,
  setAuth: ({ token, user }) => {
    clearLoggedOutFlag();
    set({ token: token, user: user, isLoggedOut: false });
  },
  clearAuth: () => {
    markLoggedOut();
    set({ token: null, user: null, isLoggedOut: true });
  },
}));
