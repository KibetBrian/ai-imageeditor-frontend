import { create } from "zustand";

import { ProcessedImage } from "./types";

interface BackgroundImageRemovalState {
  imagesBeingProcessed: string[];
  uploadedImages: File[];
  setUploadedImages: (images: File[]) => void;
  addUploadedImage: (image: File) => void;
  removeUploadedImage: (imageName: string) => void;
  setImagesBeingProcessed: (processingImages: string[]) => void;
  removeImageBeingProcessed: (imageName: string) => void;
  processedImages: ProcessedImage[];
  setProcessedImages: (processedImages: ProcessedImage[]) => void;
  removeProcessedImage: (imageName: string) => void;
  resetStore: () => void;
}

const useBackgroundImageRemovalStore = create<BackgroundImageRemovalState>((set) => ({
  imagesBeingProcessed: [],
  processedImages: [],
  uploadedImages: [],
  setUploadedImages: (images: File[]) => set({ uploadedImages: images }),
  addUploadedImage: (image: File) =>
    set((state) => ({
      uploadedImages: [...state.uploadedImages, image],
    })),
  removeUploadedImage: (imageName: string) =>
    set((state) => ({
      uploadedImages: state.uploadedImages.filter((image) => image.name !== imageName),
    })),
  setProcessedImages: (processedImages: ProcessedImage[]) => set({ processedImages }),
  removeProcessedImage: (imageName: string) =>
    set((state) => ({
      processedImages: state.processedImages.filter((image) => image.imageName !== imageName),
    })),
  setImagesBeingProcessed: (imageIds: string[]) => set({ imagesBeingProcessed: imageIds }),
  removeImageBeingProcessed: (imageId: string) =>
    set((state) => ({
      imagesBeingProcessed: state.imagesBeingProcessed.filter((id) => id !== imageId),
    })),
  resetStore: () => set({ imagesBeingProcessed: [], processedImages: [], uploadedImages: [] }),
}));

export default useBackgroundImageRemovalStore;
