"use client";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useImageGenerationStore } from "./state";
import LeftSideBarSettings from "./_components/LeftSideBarSettings";
import RightSideBarSettings from "./_components/RightSideBarSettings";
import Center from "./_components/Center";
import { Image } from "./types";
import { generateImagePostApi } from "./api";

import useHandleFetchError from "@/hooks/useHandleError";

const ImageGeneration = () => {
  const handleFetchError = useHandleFetchError();

  const { model, seed, aspectRatio, negativePrompt, negativePromptActive, numberofImagesToGenerate } = useImageGenerationStore();

  const [prompt, setPrompt] = useState("");

  const {
    mutate,
    isPending: isGeneratingImage,
    data,
  } = useMutation({
    mutationKey: ["generate-image"],

    mutationFn: async () => {
      const payload = {
        numberOfImages: numberofImagesToGenerate,
        aspectRatio: aspectRatio.ratio,
        negativePrompt: negativePromptActive ? negativePrompt : "",
        prompt,
        seed,
        model: model.name.toLowerCase(),
      };

      return generateImagePostApi(payload);
    },

    onError: (e) => {
      handleFetchError({
        error: e,
        position: "top-right",
      });
    },
  });

  const imagesBase64: string[] = data?.images || [];

  const images: Image[] = imagesBase64.map((imageBase64) => {
    return {
      url: `data:image/jpeg;base64,${imageBase64}`,
      createdAt: new Date().toISOString(),
    };
  });

  return (
    <Stack direction={"row"} height={"100%"} spacing={4}>
      <LeftSideBarSettings isGeneratingImage={isGeneratingImage} />
      <Center images={images} isGeneratingImage={isGeneratingImage} mutate={() => mutate()} prompt={prompt} setPrompt={setPrompt} />
      <RightSideBarSettings />
    </Stack>
  );
};

export default ImageGeneration;
