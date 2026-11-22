import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessages } from "../../../api/chats.api";
import type { MessagePayload } from "../types";
import type { AxiosError } from "axios";

// 1. Define an interface for the combined variables
interface SendMessageVariables {
  receiverId: string;
  payload: MessagePayload;
}

export const useSendMessages = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, SendMessageVariables>({
    mutationFn: async ({ receiverId, payload }) => {
      const response = await sendMessages(receiverId, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};
