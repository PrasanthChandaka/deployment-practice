import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/Auth.store";
import { refreshApi } from "../../../api/auth.api";
import { isLoggedOutFlagSet } from "../../../lib/authPersistence";

/**
 * Hook to initialize authentication state on app mount.
 * Attempts to restore session from HTTP-only refresh token cookie.
 *
 * Returns:
 * - isLoading: Whether currently fetching auth state
 */
export const useAuthInitialization = () => {
  const { setAuth } = useAuthStore();
  const shouldRestoreSession = !isLoggedOutFlagSet();

  const { isLoading } = useQuery({
    queryKey: ["auth-init"],
    queryFn: async () => {
      const res = await refreshApi();
      setAuth({
        token: res.data.accessToken,
        user: res.data.user,
      });
      return res.data;
    },
    enabled: shouldRestoreSession,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { isLoading };
};
