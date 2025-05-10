export interface FilePreviewItem {
  id: string;
  name: string;
  type: string;
  url: string;
  fileObject: File;
}

// S3 업로드 후 반환될 파일 정보 타입?
export interface UploadedFileInfo {
  name: string;
  url: string;
  originalFile: File;
  size: number;
  type: string;
}
