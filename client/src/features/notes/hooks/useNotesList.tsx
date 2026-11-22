import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../../api/notes.api";
import { useAuthStore } from "../../../store/Auth.store";

export const useNotesList = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await getNotes({ id: user?.id });
      return response.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!user?.id,
  });
};
