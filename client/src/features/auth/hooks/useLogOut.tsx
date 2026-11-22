import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/Auth.store";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../../api/auth.api";

export const useLogOut = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  const navigateToLogin = () => {
    navigate("/login", { replace: true });
    window.history.replaceState(null, "", "/login");
  };

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      clearAuth();
      navigateToLogin();
    },
    onError: () => {
      clearAuth();
      navigateToLogin();
    },
  });
};
