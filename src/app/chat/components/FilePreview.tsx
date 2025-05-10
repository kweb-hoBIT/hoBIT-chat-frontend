"use client";

import React from "react";
import "./filePreview.css";

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
    <div className="file-preview-container">
      {previews.map((item) => (
        <div key={item.id} className="file-preview-item">
          {item.type.startsWith("image/") && item.url ? (
            <img src={item.url} alt={item.name} className="file-preview-image" />
          ) : (
            <div className="file-preview-icon">
              <span className="file-icon-text">{item.name.split('.').pop()?.toUpperCase()}</span>
            </div>
          )}
          <div className="file-preview-info">
            <span className="file-preview-name" title={item.name}>{item.name}</span>
          </div>
          <button
            type="button"
            className="file-preview-remove-button"
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