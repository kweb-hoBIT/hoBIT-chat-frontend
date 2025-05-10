"use client";

import React from "react";

export interface FilePreviewItem {
  id: string;
  name: string;
  type: string;
  url: string;
  fileObject?: File;
}

interface FilePreviewProps {
  previews: FilePreviewItem[];
  onRemoveFile: (fileId: string) => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ previews, onRemoveFile }) => {
  if (!previews || previews.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-2.5 bg-gray-50 border border-b border-gray-200 rounded-t max-h-48 overflow-y-auto">
      {previews.map((item) => (
        <div key={item.id} className="flex items-center bg-white border border-gray-300 rounded p-2 relative"> {/* 너비 클래스 제거, Grid가 처리 */}
          {item.type.startsWith("image/") && item.url ? (
            <img src={item.url} alt={item.name} className="w-10 h-10 object-cover rounded-sm mr-2" />
          ) : (
            <div className="w-10 h-10 bg-gray-100 rounded-sm mr-2 flex items-center justify-center font-bold text-gray-700">
              <span className="text-xs uppercase">{item.name.split('.').pop()?.toUpperCase()}</span>
            </div>
          )}
          <div className="flex-grow overflow-hidden">
            <span className="block text-sm whitespace-nowrap overflow-hidden text-ellipsis text-gray-800" title={item.name}>{item.name}</span>
          </div>
          <button
            type="button"
            className="bg-transparent border-none text-gray-400 text-2xl leading-none cursor-pointer py-0 px-1 ml-1 hover:text-gray-800"
            onClick={() => onRemoveFile(item.id)}
            aria-label={`Remove ${item.name}`}
          >
            &times; {/* X 아이콘 */}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilePreview;