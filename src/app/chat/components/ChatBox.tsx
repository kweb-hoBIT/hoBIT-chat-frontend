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

  

  return (
    <div className="chat-box">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat-message ${
            message.sender === "user" ? "chat-right" : "chat-left"
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
