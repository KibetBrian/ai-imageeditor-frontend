import { MimeTypeFile } from "./types";

export const getImageUrlFromMimeTypeFile = (file: MimeTypeFile) => {
  const blob = new Blob([new Uint8Array(file.buffer.data)], {
    type: "mimeType",
  });

  const imageUrl = URL.createObjectURL(blob);

  return imageUrl;
};

export function base64ToBlob(base64: string, contentType = ""): Promise<Blob> {
  return fetch(`data:${contentType};base64,${base64}`).then((res) => res.blob());
}
