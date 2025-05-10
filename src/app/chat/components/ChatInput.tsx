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
    <div className="flex items-center border-t border-gray-200 bg-white p-2.5 gap-2.5"> {/* .chat-input */}
      <button 
        type="button" 
        className="bg-red-900 hover:bg-red-800 text-white border-none cursor-pointer transition-colors duration-200 ease-in-out rounded-full w-10 h-10 flex items-center justify-center p-0 text-2xl focus:outline-none"
        onClick={handleFileButtonClick}
        aria-label="Attach files"
      >+</button>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,video/*,audio/*,application/pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
      />
      <input
        type="text"
        className="flex-1 border-none rounded-md focus:outline-none bg-transparent text-xs p-2 sm:text-sm sm:p-2.5 md:text-base md:p-3 placeholder-gray-400"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        type="button"
        className="p-2 bg-red-900 hover:bg-red-800 text-white border-none cursor-pointer transition-colors duration-200 ease-in-out rounded-md text-xs px-3 sm:text-sm sm:px-3 md:text-base md:px-4 focus:outline-none"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
