type Feature =
  | "Background removal"
  | "Upscale"
  | "Object Removal"
  | "Inpainting"
  | "Outpainting"
  | "Generate Image";

export interface FeatureData {
  title: Feature;
  description: string;
  link: string;
}

export const applicationFeatures: FeatureData[] = [
  {
    title: "Background removal",
    description:
      "Remove the background from an image to isolate the main subject.",
    link: "/background-removal",
  },
  {
    title: "Upscale",
    description: "Increase the resolution of an image without losing quality.",
    link: "/upscale",
  },
  {
    title: "Object Removal",
    description: "Remove unwanted objects from an image seamlessly.",
    link: "object-removal",
  },
  {
    title: "Inpainting",
    description:
      "Fill in missing or damaged parts of an image with appropriate content.",
    link: "inpainting",
  },
  {
    title: "Outpainting",
    description:
      "Extend the edges of an image by generating additional content that matches the existing image.",
    link: "outpainting",
  },
  {
    title: "Generate Image",
    description:
      "Create a new image based on a given description or parameters.",
    link: "image-generation",
  },
];
