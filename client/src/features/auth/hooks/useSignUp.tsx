import { useMutation } from "@tanstack/react-query";
import type { SignUpRequest, SignUpResponse } from "../Types";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { signUpApi } from "../../../api/auth.api";

export const useSignUp = () => {
  return useMutation<SignUpResponse, AxiosError, SignUpRequest>({
    mutationFn: async (payload) => {
      const response = await signUpApi(payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Signup failed");
    },
  });
};
