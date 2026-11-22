import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../../api/chats.api";

export const useGetMessages = (senderId: string, receiverId: string) => {
  return useQuery({
    // Adding IDs to the key ensures it refetches when they change
    queryKey: ["messages", senderId, receiverId],
    queryFn: async () => {
      const response = await getMessages(senderId, receiverId);
      return response.data;
    },
    // Only run the query if both IDs are available
    enabled: !!senderId && !!receiverId,
    retry: false,
  });
};
