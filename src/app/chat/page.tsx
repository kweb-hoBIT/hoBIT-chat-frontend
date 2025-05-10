"use client";

import React, { useCallback, useState } from "react";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";
import "./ChatPage.css";
import { messagesAtom, sendMessageAtom } from "@/atoms/atoms";
import { useAtomValue, useSetAtom } from "jotai";

const ChatPage: React.FC = () => {
  const messages = useAtomValue(messagesAtom);
  const sendMessage = useSetAtom(sendMessageAtom);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [peerTyping, setPeerTyping] = useState(true);

  const handleSend = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (input.trim()) {
        sendMessage(input);
        setInput("");
        setIsTyping(false);
      }
    },
    [input, sendMessage],
  );

  const handleInputChange = (value: string) => {
    setInput(value);
    setIsTyping(value.trim().length > 0);
    // socket으로 typing 이벤트 전송 예정
  };

  return (
    <div className="chat-container">
      <form className="chat-wrapper" onSubmit={handleSend}>
        <ChatBox
          messages={messages}
          isTyping={isTyping}
          peerTyping={peerTyping}
        />
        <ChatInput input={input} setInput={handleInputChange} />
      </form>
    </div>
  );
};

export default ChatPage;
