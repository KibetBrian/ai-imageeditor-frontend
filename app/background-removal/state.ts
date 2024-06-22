/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ProcessedImage } from "./api/api";

interface BackgroundImageRemovalState {
  imagesBeingProcessed: string[];
  setImagesBeingProcessed: (processingImages: string[]) => void;
  removeImageBeingProcessed: (imageId: string) => void;
  processedImages: ProcessedImage[];
  setProcessedImages: (processedImages: ProcessedImage[]) => void;
  removeProcessedImage: (imageId: string) => void;
}

const useBackgroundImageRemovalStore = create<BackgroundImageRemovalState>()(
  persist(
    (set) => ({
      imagesBeingProcessed: [],
      processedImages: [],
      setProcessedImages: (processedImages: ProcessedImage[]) => set({ processedImages }),
      removeProcessedImage: (imageId: string) => set((state) => ({ processedImages: state.processedImages.filter((image) => image.imageId !== imageId) })),
      setImagesBeingProcessed: (imageIds: string[]) => set({ imagesBeingProcessed: imageIds }),
      removeImageBeingProcessed: (imageId: string) => set((state) => ({ imagesBeingProcessed: state.imagesBeingProcessed.filter((id) => id !== imageId) })),
    }),
    {
      name: "image-background-removal",
    },
  ),
);

export default useBackgroundImageRemovalStore;
