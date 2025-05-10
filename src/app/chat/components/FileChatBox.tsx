import Image from "next/image";
import React from "react";

interface FileChatBoxProps {
  fileUrls: string[];
}

const FileChatBox: React.FC<FileChatBoxProps> = ({ fileUrls }) => {
  const getFileNameFromUrl = (url: string): string => {
    try {
      const parsedUrl = new URL(url);
      // 경로의 마지막 부분을 파일명으로 사용
      const pathSegments = parsedUrl.pathname.split("/");
      return decodeURIComponent(pathSegments[pathSegments.length - 1]);
    } catch (e) {
      console.error("Invalid URL:", url, e);
      const lastSlashIndex = url.lastIndexOf("/");
      return url.substring(lastSlashIndex + 1);
    }
  };

  const isImageFile = (url: string): boolean => {
    return /\.(jpeg|jpg|gif|png|svg|webp)$/i.test(url);
  };

  return (
    <div className="flex flex-col gap-1">
      {fileUrls &&
        fileUrls.map((url, fileIndex) => {
          const fileName = getFileNameFromUrl(url);
          if (isImageFile(url)) {
            return (
              <div key={fileIndex} className="p-0">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block underline focus:outline-none"
                >
                  <Image
                    src={url}
                    alt={fileName || `첨부 이미지 ${fileIndex + 1}`}
                    className="block h-auto max-h-[200px] w-auto max-w-[300px] rounded-md object-contain"
                  />
                </a>
              </div>
            );
          } else {
            return (
              <div key={fileIndex} className="py-1">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-sm break-all underline focus:outline-none"
                >
                  📄 {fileName || `첨부 파일 ${fileIndex + 1}`}
                </a>
              </div>
            );
          }
        })}
    </div>
  );
};

export default FileChatBox;
