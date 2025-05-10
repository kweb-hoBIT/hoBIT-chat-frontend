"use client";

import React, { useRef } from "react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  onFilesSelected: (files: FileList) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  handleSend,
  onFilesSelected,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFilesSelected(files);
    }

    if (event.target) {
      event.target.value = "";
    }
  };

  return (
    <div className="chat-input">
      <button 
        type="button" 
        className="chat-input-file-button" 
        onClick={handleFileButtonClick}
        aria-label="Attach files"
      >+</button>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*,video/*,audio/*,application/pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
      />
      <input
        type="text"
        className="chat-input-text-field"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type your message..."
      />
      <button type="button" className="chat-input-send-button" onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatInput;
