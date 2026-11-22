import toast from "react-hot-toast";
import type { AuthResponse, LoginRequest } from "../Types";
import type { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../../api/auth.api";

export const useLogin = () => {
  return useMutation<AuthResponse, AxiosError, LoginRequest>({
    mutationFn: async (payload) => {
      const response = await loginApi(payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("login successful.");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Login failed");
    },
  });
};
