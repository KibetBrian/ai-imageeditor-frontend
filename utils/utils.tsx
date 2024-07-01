import { twMerge, ClassNameValue } from "tailwind-merge";
import { createId } from "@paralleldrive/cuid2";
import { clsx } from "clsx";

export function cn(...inputs: ClassNameValue[]) {
  return clsx(twMerge(inputs));
}

type LocalStorageKey = "numberOfImagesToBeGenerated" | "imageGenerationSeed" | "negativePromptActive";

export const setToLocalStorage = (key: LocalStorageKey, value: any) => {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof value === "object") {
    const stringifiedValue = JSON.stringify(value);

    localStorage.setItem(key, stringifiedValue);
  }

  localStorage.setItem(key, value);
};

export const retrieveFromLocalStorage = (key: LocalStorageKey) => {
  if (typeof window === "undefined") {
    return;
  }

  if (key === "imageGenerationSeed") {
    return Number(localStorage.getItem(key));
  }

  if (key === "numberOfImagesToBeGenerated") {
    return Number(localStorage.getItem(key));
  }

  if (key === "negativePromptActive") {
    return Boolean(localStorage.getItem(key));
  }

  const value = localStorage.getItem(key);

  return value;
};

export const generateCUID = () => {
  return createId();
};
