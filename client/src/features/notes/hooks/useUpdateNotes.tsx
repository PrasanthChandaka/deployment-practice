import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNotes } from "../../../api/notes.api";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export interface UpdateNotesPayload {
  id: string;
  user: string | number | undefined;
  description: string;
  title: string;
  completed?: boolean;
}

export const useUpdateNotes = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError<{ message: string }>, UpdateNotesPayload>({
    mutationFn: async (payload: UpdateNotesPayload) => {
      const response = await updateNotes(payload);
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success(`${response?.message}` || "Notes updated successfully");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err.message || "Something went wrong",
      );
    },
  });
};
