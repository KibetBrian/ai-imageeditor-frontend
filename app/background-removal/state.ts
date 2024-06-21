/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BackgroundImageRemovalState {
  imagesBeingProcessed: string[];
  setImagesBeingProcessed: (processingImages: string[]) => void;
  removeImageBeingProcessed: (imageId: string) => void;
}

const useBackgroundImageRemovalStore = create<BackgroundImageRemovalState>()(
  persist(
    (set) => ({
      imagesBeingProcessed: [],
      setImagesBeingProcessed: (imageIds: string[]) => set({ imagesBeingProcessed: imageIds }),
      removeImageBeingProcessed: (imageId: string) => set((state) => ({ imagesBeingProcessed: state.imagesBeingProcessed.filter((id) => id !== imageId) })),
    }),
    {
      name: "image-background-removal",
    },
  ),
);

export default useBackgroundImageRemovalStore;
