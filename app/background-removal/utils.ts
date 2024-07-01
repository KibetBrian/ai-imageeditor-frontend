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

export const getImageDimensions = (file: File): Promise<{ width: number; height: number; url: string }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    const url = URL.createObjectURL(file);

    img.src = url;

    img.onload = () => {
      resolve({ width: img.width, height: img.height, url });
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Failed to load image"));
    };
  });
};
