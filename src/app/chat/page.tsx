"use client";

import React, { useCallback, useState } from "react";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";
import FileDropZone from "./components/FileDropZone";
import FilePreview, { FilePreviewItem } from "./components/FilePreview";
import "./ChatPage.css";

interface MessageType {
  sender: string;
  text: string;
  fileUrls?: string[];
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    { sender: "admin", text: "안녕하세요! 무엇을 도와드릴까요?" },
    { sender: "user", text: "안녕하세요! 채팅 테스트 중입니다." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [peerTyping, setPeerTyping] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<FilePreviewItem[]>([]);

  const handleSend = async () => {
    if (input.trim() === '' && droppedFiles.length === 0) return;

    const newMessages: MessageType[] = [];
    const currentInput = input.trim();

    // S3 업로드 및 URL 반환
    // let uploadedFileInfos: { name: string, url: string, originalFile: File }[] = [];
    // if (droppedFiles.length > 0) {
    //   uploadedFileInfos = await Promise.all(
    //     droppedFiles.map(async (file) => {
    //       const formData = new FormData();
    //       formData.append("file", file);
    //       // const url = await uploadFileToS3(formData);
    //       return { name: file.name, url: url, originalFile: file };
    //     })
    //   );
    // }

    // S3 업로드 했다 치고 받아온 정보
    const uploadedFileInfos = droppedFiles.map(file => ({
      name: file.name,
      url: `https://s3.example.com/${file.name}`,
      originalFile: file,
      size: file.size,
      type: file.type,
    }));

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
    setDroppedFiles([]);
    setFilePreviews([]);
  };

  const processFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const newUploadedFilesArray = Array.from(files);
    
    const currentFileNames = new Set(droppedFiles.map(file => file.name));
    const uniqueNewFiles = newUploadedFilesArray.filter(file => !currentFileNames.has(file.name));

    if (uniqueNewFiles.length === 0 && newUploadedFilesArray.length > 0) {
      console.log("중복된 파일이 있습니다.");
      // 작은 알림 주면 좋지 않을까나
      return;
    }

    setDroppedFiles((prev) => [...prev, ...uniqueNewFiles]);

    const newPreviews: FilePreviewItem[] = [];
    uniqueNewFiles.forEach((file) => {
      const reader = new FileReader();

      const fileId = `${file.name}-${file.lastModified}-${file.size}`;

      reader.onload = () => {
        newPreviews.push({
          id: fileId,
          name: file.name,
          type: file.type,
          url: reader.result as string,
          fileObject: file
        });
        if (newPreviews.length === uniqueNewFiles.length) {
          setFilePreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

  }, [droppedFiles, filePreviews]);

  const handleRemovePreviewFiles = useCallback((fileIdToRemove: string) => {
    setFilePreviews((prev) => prev.filter((item) => item.id !== fileIdToRemove));

    const removedPreview = filePreviews.find((item) => item.id === fileIdToRemove);
    if (removedPreview) {
      setDroppedFiles((prev) => prev.filter((file) => file.name !== removedPreview.name));
    }

  }, [filePreviews]);

  const handleInputChange = (value: string) => {
    setInput(value);
    setIsTyping(value.trim().length > 0);
    // socket으로 typing 이벤트 전송 예정
  };


  return (
    <div className="chat-container">
      <FileDropZone onFilesDropped={processFiles}>
          <ChatBox
            messages={messages}
            isTyping={isTyping}
            peerTyping={peerTyping}
          />
          {filePreviews.length > 0 && (
            <FilePreview
              previews={filePreviews}
              onRemoveFile={handleRemovePreviewFiles}
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
