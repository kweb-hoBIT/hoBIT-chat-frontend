import React, { useRef, useEffect } from "react";
import TypingIndicator from "./TypingIndicator";
import { Sender, type Message } from "@/types";
import FileChatBox from "./FileChatBox";

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

  const baseMessageClasses =
    "py-2.5 px-4 rounded-2xl break-words text-xs max-w-lg sm:text-sm md:text-sm";

  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
      {messages.map(({ messageId, sender, text, fileUrls }) => (
        <div
          key={messageId}
          className={` ${baseMessageClasses} ${
            sender === Sender.Self
              ? "self-end bg-red-900 text-white"
              : "self-start bg-gray-200 text-gray-800"
          }`}
        >
          {text && <span>{text}</span>}
          {fileUrls && fileUrls.length > 0 && (
            <FileChatBox fileUrls={fileUrls} />
          )}
        </div>
      ))}
      {peerTyping && <TypingIndicator position="left" sender={Sender.Other} />}
      {isTyping && <TypingIndicator position="right" sender={Sender.Self} />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBox;
