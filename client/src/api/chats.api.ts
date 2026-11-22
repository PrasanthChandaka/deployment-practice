import type { MessagePayload } from "../features/chats/types";
import { privateApi } from "./axios";

export const getMessages = (senderId: string, receiverId: string) =>
  privateApi.get(`/api/messages/${senderId}/${receiverId}`);

export const sendMessages = (receiverId: string, payload: MessagePayload) =>
  privateApi.post(`/api/messages/send/${receiverId}`, payload);
