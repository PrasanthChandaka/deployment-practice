import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      // Ignore 401 here if interceptor handles it
      if (error?.response?.status === 401) return;

      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: any) => {
      if (error?.response?.status === 401) return;

      toast.error(error?.response?.data?.message || "Action failed");
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
