type Status = "processing" | "processed" | "failed";

export interface MimeTypeFile {
  buffer: {
    type: string;
    data: number[];
  };
  encoding: string;
  fieldname: string;
  mimetype: string;
  name: string;
  originalname: string;
  size: number;
}

export interface RemoveBackgroundProcessingResults {
  message: string;
  files: MimeTypeFile[];
}
export interface ProcessedImage {
  imageId: string;
  base64Image: string;
  imageName: string;
  status: Status;
  message: string;
}
