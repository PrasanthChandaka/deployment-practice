import { useUsers } from "../../features/auth/hooks/useUsers";
import { useAuthStore } from "../../store/Auth.store";
import { useChatStore } from "../../store/Chat.store";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";

const ChatSidebar = () => {
  const { selectedChat, setChatId } = useChatStore();
  const { data: users, isLoading } = useUsers();
  const { user } = useAuthStore();

  const chatUsers = users?.users?.filter((each: any) => each._id !== user?.id);

  return (
    <div className="h-full w-1/4  flex flex-col border-r border-r-transparent shadow-2xl">
      <div className="chat-header p-4 text-lg font-semibold text-white">
        Chats
      </div>
      <ul className="flex-1 overflow-y-auto space-y-2 p-3">
        {chatUsers
          ? chatUsers?.map((chat: any) => (
              <li
                key={chat._id}
                className={`flex items-center gap-3 rounded-lg transition-colors duration-300 ${selectedChat?._id === chat._id ? "bg-emerald-600" : "hover:bg-emerald-900 text-gray-300"} px-3 py-2 cursor-pointer`}
                onClick={() => setChatId(chat)}
              >
                <img
                  src={`https://placehold.co/40?text=${chat.username.charAt(0)}`}
                  alt={chat.username}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-white">
                    {chat.username}
                  </div>
                  <div className="text-xs text-slate-300">{chat.status}</div>
                </div>
                <span
                  className={`h-2.5 w-2.5 rounded-full ${chat.active ? "bg-emerald-400" : "bg-slate-400"}`}
                />
              </li>
            ))
          : isLoading && <SidebarSkeleton />}
      </ul>
    </div>
  );
};

export default ChatSidebar;
