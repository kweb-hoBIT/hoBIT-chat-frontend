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
    <div className="flex items-center gap-2.5 border-t border-gray-200 bg-white p-2.5">
      <button
        type="button"
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-red-900 p-0 text-2xl text-white transition-colors duration-200 ease-in-out hover:bg-red-800 focus:outline-none"
        onClick={handleFileButtonClick}
        aria-label="Attach files"
      >
        +
      </button>
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
        className="flex-1 rounded-md border-none bg-transparent p-2 text-xs placeholder-gray-400 focus:outline-none sm:p-2.5 sm:text-sm md:p-3 md:text-base"
        value={input}
        onKeyDown={(e) => {
          if (e.key === "Enter" && input.trim()) {
            handleSend();
          }
        }}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        type="button"
        className="cursor-pointer rounded-md border-none bg-red-900 p-2 px-3 text-xs text-white transition-colors duration-200 ease-in-out hover:bg-red-800 focus:outline-none sm:px-3 sm:text-sm md:px-4 md:text-base"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
