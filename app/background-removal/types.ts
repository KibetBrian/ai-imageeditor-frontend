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
