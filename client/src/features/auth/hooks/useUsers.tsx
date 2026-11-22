import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "../../../api/auth.api";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getAllUser();
      return response.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
