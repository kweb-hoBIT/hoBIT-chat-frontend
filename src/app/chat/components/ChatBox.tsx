import React, { useRef, useEffect } from "react";
import TypingIndicator from "./TypingIndicator";
import type { Message } from "@/types";

interface ChatBoxProps {
  messages: Message[];

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
      {messages.map(({ message, index }) => {
        const { messageId, sender, text, fileUrls } = message;
        
        return (<div
          key={index}
          className={`
            ${baseMessageClasses}
            ${
             sender === "self"
             ? "self-end bg-red-900 text-white" 
             : "self-start bg-gray-200 text-gray-800" 
          }`}
        >
          {text && <span>{text}</span>}
          {fileUrls && fileUrls.length > 0 && <FileChatBox message={message} />}
        </div>);
      })}
      {peerTyping && <TypingIndicator position="left" sender="admin" />}
      {isTyping && <TypingIndicator position="right" sender="user" />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBox;
