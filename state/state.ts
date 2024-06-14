import { create } from "zustand";

export const canvasStore = create((set) => ({
  data: {},
  updateData: (newData: object) => set({ data: newData }),
}));

export const useGenerateImageStore = create((set) => ({
  data: {
    numberOfImages: 1,
    imageGenerationModel: {
      name: "Sd3",
      model: "sd3",
      cost: 4,
      description: "A stable diffusion model",
    },
  },

  updateImageGenerationModel: (newModel: object) =>
    set((state: any) => ({ ...state, imageGenerationModel: newModel })),
}));
