import { MimeTypeFile } from "./types";

export const getImageUrlFromMimeTypeFile = (file: MimeTypeFile) => {
  const blob = new Blob([new Uint8Array(file.buffer.data)], {
    type: "mimeType",
  });

  const imageUrl = URL.createObjectURL(blob);

  return imageUrl;
};
