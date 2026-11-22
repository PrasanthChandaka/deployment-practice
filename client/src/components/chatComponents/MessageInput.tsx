import { useRef, useState } from "react";
import Button from "../../shared/Button";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useSendMessages } from "../../features/chats/hooks/useSendMessages";
import { useChatStore } from "../../store/Chat.store";

const MessageInput = () => {
  const { mutate, isPending } = useSendMessages();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { selectedChat } = useChatStore();

  // 1. Fixed the form event type
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Guard rails: Check for active room context
    if (!selectedChat?._id) {
      toast.error("Please select a user to chat with first");
      return;
    }

    // Express v5 content validation fallback check
    if (!message.trim() && !image) {
      return;
    }

    // 2. Fixed mutation signature: Pass a single object payload containing both variables
    mutate(
      {
        receiverId: selectedChat._id,
        payload: {
          text: message.trim(),
          imageFile: image,
        },
      },
      {
        onSuccess: () => {
          setMessage("");
          removeImage();
        },
        onError: () => {
          toast.error("Failed to send message");
        },
      },
    );
  };

  // 3. Fixed standard change handling types to allow text erasure/backspacing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // 4. Added proper React event typing for file inputs
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      {image && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={image}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute cursor-pointer -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center"
              type="button"
            >
              <X size={10} />
            </button>
          </div>
        </div>
      )}
      <form className="w-full p-2 flex gap-3 flex-wrap" onSubmit={handleSubmit}>
        <input
          className="flex-1 border-2 border-emerald-600 p-2 outline-0 rounded-md"
          placeholder="Enter your message..."
          type="text"
          value={message}
          onChange={handleChange}
          disabled={isPending}
        />
        <div className="flex gap-2">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={inputRef}
            onChange={handleUploadFile}
            disabled={isPending}
          />
          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isPending}
          >
            <Image size={20} />
          </Button>
          <Button type="submit" isLoading={isPending} disabled={isPending}>
            <Send size={20} />
          </Button>
        </div>
      </form>
    </>
  );
};

export default MessageInput;
