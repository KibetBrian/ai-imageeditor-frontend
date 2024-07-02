/* eslint-disable no-unused-vars */
import type { ImageGenerationModel, AspectRatio } from "./types";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { models, negativePromptsDefaultValue } from "./constants";

interface ImageGenerationState {
  seed: number;
  seedRandomized: boolean;
  negativePrompt: string;
  aspectRatio: AspectRatio;
  model: ImageGenerationModel;
  negativePromptActive: boolean;
  numberofImagesToGenerate: number;
  setSeed: (seed: number) => void;
  setSeedRandomized: (randomSeed: boolean) => void;
  setModel: (model: ImageGenerationModel) => void;
  setAspectRatio: (aspectRatio: AspectRatio) => void;
  setNumberofImagesToGenerate: (numberofImagesToGenerate: number) => void;
  setNegativePrompt: (negativePrompt: string) => void;
  setNegativePromptActive: (negativePromptActive: boolean) => void;
}

export const useImageGenerationStore = create<ImageGenerationState>()(
  persist(
    (set) => ({
      model: models.find((m) => m.model === "core") as ImageGenerationModel,
      aspectRatio: {
        name: "Widescreen",
        ratio: "16:9",
      },
      seed: 0,
      seedRandomized: true,
      negativePrompt: negativePromptsDefaultValue,
      setSeedRandomized: (randomSeed: boolean) => set((state) => ({ ...state, seedRandomized: randomSeed })),
      numberofImagesToGenerate: 4,
      negativePromptActive: false,
      setModel: (model: ImageGenerationModel) => set((state) => ({ ...state, model })),
      setAspectRatio: (aspectRatio: AspectRatio) => set((state) => ({ ...state, aspectRatio })),
      setNumberofImagesToGenerate: (numberofImagesToGenerate: number) => set((state) => ({ ...state, numberofImagesToGenerate })),
      setNegativePrompt: (negativePrompt: string) => set((state) => ({ ...state, negativePrompt })),
      setSeed: (seed: number) => set((state) => ({ ...state, seed })),
      setNegativePromptActive: (negativePromptActive: boolean) => set((state) => ({ ...state, negativePromptActive })),
    }),
    {
      name: "image-generation",
    },
  ),
);
