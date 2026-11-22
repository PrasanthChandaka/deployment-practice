import ChatContainer from "../../components/chatComponents/ChatContainer";
import ChatSidebar from "../../components/chatComponents/ChatSidebar";
import NoChatContainer from "../../components/chatComponents/NoChatContainer";
import { useChatStore } from "../../store/Chat.store";

const Chats = () => {
  const { selectedChat } = useChatStore();
  return (
    <div className="flex gap-2 h-full overflow-hidden">
      <ChatSidebar />
      <div className="w-full h-full overflow-hidden">
        {selectedChat ? <ChatContainer /> : <NoChatContainer />}
      </div>
    </div>
  );
};

export default Chats;
