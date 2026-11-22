import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const NoChatContainer = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center items-center gap-5 p-5"
      >
        <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-emerald-900 animate-bounce duration-300 ease-in-out">
          <MessageSquare className="size-8" />
        </div>
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-emerald-600 text-xl md:text-3xl font-bold">
            Welcome to chats
          </h2>
          <p className="text-base-200 text-sm">
            select a conversation from the sidebar to start chatting.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NoChatContainer;
