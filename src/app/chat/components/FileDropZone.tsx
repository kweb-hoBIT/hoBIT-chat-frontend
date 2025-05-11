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

  const baseDropZoneClasses =
    "h-full w-full max-w-[800px] mx-auto flex flex-col px-4 transition-colors duration-200 ease-in-out relative";

  const draggingClasses = isDragging
    ? "border-primary bg-white"
    : "border-transparent";

  const dropZoneClassName = `${baseDropZoneClasses} ${draggingClasses}`.trim();

  const dropIndicatorClassName =
    "absolute inset-0 flex items-center justify-center text-primary text-lg font-bold pointer-events-none rounded-md";

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
        <div className={dropIndicatorClassName}>여기에 파일을 드롭하세요.</div>
      )}
    </div>
  );
};

export default FileDropZone;
