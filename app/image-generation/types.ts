export type StableDiffusionModel = "ultra" | "core" | "sd3";

export interface ImageGenerationModel {
  name: string;
  model: StableDiffusionModel;
  cost: number;
  description: string;
}

export interface AspectRatio {
  name: string;
  ratio: string;
}
