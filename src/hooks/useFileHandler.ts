import { useState, useCallback } from "react";
import { FilePreviewItem, UploadedFileInfo } from "@/types/chat";

export const useFileHandler = () => {
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<FilePreviewItem[]>([]);

  const processFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const newUploadedFilesArray = Array.from(files);
    const currentFileNames = new Set(droppedFiles.map(file => file.name));
    const uniqueNewFiles = newUploadedFilesArray.filter(file => !currentFileNames.has(file.name));

    if (uniqueNewFiles.length === 0 && newUploadedFilesArray.length > 0) {
      console.log("중복된 파일이 있습니다.");
      // TODO: 사용자에게 알림 표시
      return;
    }

    setDroppedFiles((prev) => [...prev, ...uniqueNewFiles]);

    const newPreviewsPromises = uniqueNewFiles.map((file) => {
      return new Promise<FilePreviewItem>((resolve) => {
        const reader = new FileReader();
        const fileId = `${file.name}-${file.lastModified}-${file.size}`;

        reader.onload = () => {
          resolve({
            id: fileId,
            name: file.name,
            type: file.type,
            url: reader.result as string,
            fileObject: file,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPreviewsPromises).then(newPreviews => {
        setFilePreviews(prev => [...prev, ...newPreviews]);
    });

  }, [droppedFiles]);

  const handleRemovePreview = useCallback((fileIdToRemove: string) => {
    const removedPreview = filePreviews.find((item) => item.id === fileIdToRemove);
    setFilePreviews((prev) => prev.filter((item) => item.id !== fileIdToRemove));

    if (removedPreview) {
      setDroppedFiles((prev) => prev.filter((file) => file.name !== removedPreview.name));
    }
  }, [filePreviews]);

  // TODO: S3 연결 후 async-await 변경
  const getUploadedFileInfos = (): UploadedFileInfo[] => {
    // S3 연결
    // const uploadedFileInfos = await Promise.all(
    //   droppedFiles.map(async (file) => {
    //     const formData = new FormData();
    //     formData.append("file", file);
    //     const url = await uploadFileToS3(formData);
    //     return { name: file.name, url: url, originalFile: file, size: file.size, type: file.type };
    //   })
    // );
    return droppedFiles.map(file => ({
      name: file.name,
      // url: `https://s3.example.com/${file.name}`,
      url: 'https://sungunjo.github.io/assets/img/image_and_hyperlink/road_image.jpg', // for img test
      originalFile: file,
      size: file.size,
      type: file.type,
    }));
  };

  const resetFiles = () => {
    setDroppedFiles([]);
    setFilePreviews([]);
  };

  return {
    droppedFiles,
    filePreviews,
    processFiles,
    handleRemovePreview,
    getUploadedFileInfos,
    resetFiles,
  };
};