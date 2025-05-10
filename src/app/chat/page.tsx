"use client";

import React, { useCallback, useState } from "react";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";

import { messagesAtom, sendMessageAtom } from "@/atoms/atoms";
import { useAtomValue, useSetAtom } from "jotai";

const ChatPage: React.FC = () => {
  const messages = useAtomValue(messagesAtom);
  const sendMessage = useSetAtom(sendMessageAtom);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [peerTyping, setPeerTyping] = useState(true);
  
  const {
    droppedFiles,
    filePreviews,
    processFiles,
    handleRemovePreview,
    getUploadedFileInfos,
    resetFiles,
  } = useFileHandler();

  const handleSend = async () => {
    const currentInput = input.trim();
    if (currentInput === '' && droppedFiles.length === 0) return;

    const newMessages: MessageType[] = [];

    // TODO: S3 연결 후 await 추가
    const uploadedFileInfos = getUploadedFileInfos();

    if (currentInput && uploadedFileInfos.length > 0) {
      // 1. 텍스트와 파일이 모두 있는 경우
      newMessages.push({
        sender: "user",
        text: currentInput,
        fileUrls: uploadedFileInfos.map(fileInfo => fileInfo.url),
      });
    } else if (currentInput) {
      // 2. 텍스트만 있는 경우
      newMessages.push({ sender: "user", text: currentInput });
    } else if (uploadedFileInfos.length > 0) {
      // 3. 파일만 있는 경우
      newMessages.push({
        sender: "user",
        text: "",
        fileUrls: uploadedFileInfos.map(fileInfo => fileInfo.url),
      });
    }

    if (newMessages.length > 0) {
      setMessages(prevMessages => [...prevMessages, ...newMessages]);
    }

    setInput("");
    setIsTyping(false);
    resetFiles();
  };


  const handleInputChange = (value: string) => {
    setInput(value);
    setIsTyping(value.trim().length > 0);
    // TODO: socket으로 typing 이벤트 전송
  };


  return (
    <div className="mx-auto flex h-screen max-w-screen-lg flex-col overflow-hidden max-md:rounded-none max-md:shadow-none">
      <FileDropZone onFilesDropped={processFiles}>
          <ChatBox
            messages={messages}
            isTyping={isTyping}
            peerTyping={peerTyping}
          />
          {filePreviews.length > 0 && (
            <FilePreview
              previews={filePreviews}
              onRemoveFile={handleRemovePreview}
            />
          )}
          <ChatInput
            input={input}
            setInput={handleInputChange}
            handleSend={handleSend}
            onFilesSelected={processFiles}
          />
      </FileDropZone>
    </div>
  );
};

export default ChatPage;
