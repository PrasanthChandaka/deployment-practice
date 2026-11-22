import axios from "axios";
import { useAuthStore } from "../store/Auth.store";

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

/**
 * Standalone async function to refresh access token.
 * Called from response interceptor (not a React hook).
 * Updates Zustand store directly using getState().
 */
async function refreshAccessToken(): Promise<boolean> {
  try {
    console.log("Token expired, attempting silent refresh...");

    const res = await publicApi.get("/api/auth/refresh");

    // Update Zustand with the new token
    useAuthStore.getState().setAuth({
      token: res.data.accessToken,
      user: res.data.user,
    });

    return true;
  } catch (error) {
    console.error("Refresh token expired. Logging out...");
    useAuthStore.getState().clearAuth();
    return false;
  }
}

privateApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

privateApi.interceptors.response.use(
  (response: any) => response, // If request is successful, just return the response
  async (error: any) => {
    const originalRequest = error.config;

    // Check if error is 401 (Expired) and we haven't already tried to retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark this request so we don't loop infinitely

      try {
        // Call standalone async refresh function (not a React hook)
        const refreshSucceeded = await refreshAccessToken();

        if (refreshSucceeded) {
          // Get the new token from store
          const newToken = useAuthStore.getState().token;

          // Update the failed request's header with the NEW token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          // RETRY the original request with the new token!
          return privateApi(originalRequest);
        } else {
          // Refresh failed, reject with original error
          return Promise.reject(error);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
