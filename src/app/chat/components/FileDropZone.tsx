"use client";

import React from "react";
import { useFileDrop } from "@/hooks/useFileDrop";

interface FileDropZoneProps {
  onFilesDropped: (files: FileList) => void;
  children: React.ReactNode;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({
  onFilesDropped,
  children,
}) => {
  const {
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useFileDrop({ onFilesDropped });

  const dropZoneClassName = `chat-file-dropzone ${
    isDragging ? "dragging" : ""
  }`.trim();

  return (
    <div
      className={dropZoneClassName}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
      {isDragging && (
        <div className="drop-indicator">
          여기에 파일을 드롭하세요.
        </div>
      )}
    </div>
  );
};

export default FileDropZone;