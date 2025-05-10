import { MessageType } from '@/types/chat';
import React from 'react';

interface FileChatBoxProps {
    message: MessageType;
}

const FileChatBox: React.FC<FileChatBoxProps> = ({ message }) => {
    const { fileUrls } = message;

    const getFileNameFromUrl = (url: string): string => {
        try {
            const parsedUrl = new URL(url);
            // 경로의 마지막 부분을 파일명으로 사용
            const pathSegments = parsedUrl.pathname.split('/');
            return decodeURIComponent(pathSegments[pathSegments.length - 1]);
        } catch (e) {
            // 유효한 URL 형식이 아닐 때
            const lastSlashIndex = url.lastIndexOf('/');
            return url.substring(lastSlashIndex + 1);
        }
    };

    const isImageFile = (url: string): boolean => {
        return /\.(jpeg|jpg|gif|png|svg|webp)$/i.test(url);
    };

    return (
        <div className="flex flex-col gap-1">
            {fileUrls && fileUrls.map((url, fileIndex) => {
            const fileName = getFileNameFromUrl(url);
            if (isImageFile(url)) {
                return (
                <div key={fileIndex} className="p-0">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block underline text-red-900 hover:text-red-700 focus:outline-none"
                    >
                        <img
                            src={url}
                            alt={fileName || `첨부 이미지 ${fileIndex + 1}`}
                            className="block max-w-[300px] max-h-[200px] w-auto h-auto object-contain rounded-md"
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
                        className="block underline text-red-900 hover:text-red-700 break-all focus:outline-none focus:ring-2 focus:ring-red-500 rounded-sm"
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