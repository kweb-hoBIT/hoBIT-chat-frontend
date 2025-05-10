import React, { useRef, useEffect } from "react";
import TypingIndicator from "./TypingIndicator";
import { MessageType } from "@/types/chat";
import FileChatBox from "./FileChatBox";

interface ChatBoxProps {
  messages: MessageType[];
  isTyping: boolean;
  peerTyping: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  messages,
  isTyping,
  peerTyping,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, peerTyping]);

  const baseMessageClasses = "py-2.5 px-4 rounded-2xl break-words text-xs max-w-lg sm:text-sm md:text-sm";


  return (
    <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`
            ${baseMessageClasses}
            ${
             message.sender === "user"
             ? "self-end bg-red-900 text-white" 
             : "self-start bg-gray-200 text-gray-800" 
          }`}
        >
          {message.text && <span>{message.text}</span>}
          {message.fileUrls && message.fileUrls.length > 0 && <FileChatBox message={message} />}
        </div>
      ))}
      {peerTyping && <TypingIndicator position="left" sender="admin" />}
      {isTyping && <TypingIndicator position="right" sender="user" />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBox;
