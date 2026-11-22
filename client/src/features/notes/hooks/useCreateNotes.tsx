import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createNotes } from "../../../api/notes.api";
import toast from "react-hot-toast";

export interface CreateNotesPayload {
  user: string | number | undefined;
  description: string;
  title: string;
  completed?: boolean;
}

export const useCreateNotes = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError<{ message: string }>, CreateNotesPayload>({
    mutationFn: async (payload: CreateNotesPayload) => {
      const response = await createNotes(payload);
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });

      toast.success(response?.message || "Notes created successfully");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err.message || "Something went wrong",
      );
    },
  });
};
