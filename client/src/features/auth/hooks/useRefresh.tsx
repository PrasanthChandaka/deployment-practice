import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/Auth.store";
import { refreshApi } from "../../../api/auth.api";

export const useRefreshToken = () => {
  const { setAuth, clearAuth } = useAuthStore();

  return useQuery({
    queryKey: ["refresh"],
    queryFn: async () => {
      try {
        const res = await refreshApi();

        setAuth({
          token: res.data.accessToken,
          user: res.data.user,
        });

        return res.data;
      } catch (err) {
        clearAuth();
        throw err;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
