import { create } from "zustand";
import type { Role } from "../features/auth/Types";

type ChatUser = {
  _id: string;
  username: string;
  active: boolean;
  roles: Role[];
  avatar?: string;
  usernameNormalized: string;
};

type ChatState = {
  selectedChat: ChatUser | null;
  setChatId: (data: ChatUser) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  selectedChat: null,
  setChatId: (activeChatUser: ChatUser) =>
    set({ selectedChat: activeChatUser }),
}));
