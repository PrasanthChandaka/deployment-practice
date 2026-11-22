import { X } from "lucide-react";
import { useChatStore } from "../../store/Chat.store";
import MessageInput from "./MessageInput";
import { useGetMessages } from "../../features/chats/hooks/useGetMessages";
import { useAuthStore } from "../../store/Auth.store";
import { formatMessageTime } from "../../lib/utils";
import { useEffect, useRef } from "react";
import MessageSkeleton from "../skeletons/MessageSkeleton";

const ChatContainer = () => {
  const { selectedChat, setChatId } = useChatStore();
  const { user } = useAuthStore();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetMessages(
    selectedChat?._id || "",
    user?.id || "",
  );

  useEffect(() => {
    if (messageEndRef.current && data) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="chat-header px-4 py-2 flex justify-between items-center bg-emerald-950 rounded-xl">
        <div className="flex gap-3 items-center justify-center">
          <img
            src={`https://placehold.co/40?text=${selectedChat?.username.charAt(0)}`}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h2 className="capitalize text-lg font-bold">
              {selectedChat?.username}
            </h2>
            <p className="text-emerald-600 font-bold">
              {selectedChat?.active ? "Online" : "Offine"}
            </p>
          </div>
        </div>
        <div className="p-2 cursor-pointer">
          <X
            size={20}
            className="m-auto hover:scale-125 transition-all duration-100"
            onClick={() =>
              setChatId(null as unknown as Parameters<typeof setChatId>[0])
            }
          />
        </div>
      </div>

      <div className="h-full flex flex-col gap-3 overflow-y-auto">
        {data
          ? data?.map((message: any) => (
              <div
                ref={messageEndRef}
                key={message._id}
                className={`chat ${message.senderId === user?.id ? "chat-end" : "chat-start"} `}
              >
                <div className=" chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                      alt="profile pic"
                    />
                  </div>
                </div>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
                <div className="chat-bubble flex flex-col">
                  {message.imageFile && (
                    <img
                      src={message.imageFile}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            ))
          : isLoading && <MessageSkeleton />}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
