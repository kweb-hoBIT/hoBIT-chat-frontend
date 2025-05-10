import Image from "next/image";
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

const FilePreview: React.FC<FilePreviewProps> = ({
  previews,
  onRemoveFile,
}) => {
  if (!previews || previews.length === 0) {
    return null;
  }

  return (
    <div className="grid max-h-48 grid-cols-1 gap-2.5 overflow-y-auto rounded-t border border-b border-gray-200 bg-gray-50 p-2.5 sm:grid-cols-2">
      {previews.map((item) => (
        <div
          key={item.id}
          className="relative flex items-center rounded border border-gray-300 bg-white p-2"
        >
          {" "}
          {/* 너비 클래스 제거, Grid가 처리 */}
          {item.type.startsWith("image/") && item.url ? (
            <Image
              src={item.url}
              alt={item.name}
              className="mr-2 h-10 w-10 rounded-sm object-cover"
            />
          ) : (
            <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-sm bg-gray-100 font-bold text-gray-700">
              <span className="text-xs uppercase">
                {item.name.split(".").pop()?.toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-grow overflow-hidden">
            <span
              className="block overflow-hidden text-sm text-ellipsis whitespace-nowrap text-gray-800"
              title={item.name}
            >
              {item.name}
            </span>
          </div>
          <button
            type="button"
            className="ml-1 cursor-pointer border-none bg-transparent px-1 py-0 text-2xl leading-none text-gray-400 hover:text-gray-800"
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
