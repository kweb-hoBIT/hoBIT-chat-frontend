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
  }, [messages, isTyping]);

  return (
    <div className="chat-box">
      {messages.map(({ messageId, sender, text }) => (
        <div
          key={messageId}
          className={`chat-message ${
            sender === "self" ? "chat-right" : "chat-left"
          }`}
        >
          <span>{text}</span>
        </div>
      ))}
      {peerTyping && <TypingIndicator position="left" sender="admin" />}
      {isTyping && <TypingIndicator position="right" sender="user" />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBox;
