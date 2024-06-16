"use client";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

import { useImageGenerationStore } from "./state";
import LeftSideBarSettings from "./_components/LeftSideBarSettings";
import RightSideBarSettings from "./_components/RightSideBarSettings";
import Center from "./_components/Center";
import { Image } from "./types";

import useHandleFetchError from "@/hooks/useHandleError";
import { appConfigs } from "@/config/app";

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
      const results = await axios.post(`${appConfigs.backend}generate/image`, {
        numberOfImages: numberofImagesToGenerate,
        aspectRatio: aspectRatio.ratio,
        negativePrompt: negativePromptActive ? negativePrompt : "",
        prompt,
        seed,
        model: model.name.toLowerCase(),
      });

      const isStatusValid = results.status >= StatusCodes.OK && results.status < StatusCodes.MULTIPLE_CHOICES;

      if (!isStatusValid) {
        throw results.data;
      }

      return results.data;
    },
    onError: (e) => {
      handleFetchError({
        error: e,
        position: "top-right",
      });
    },
  });

  const images: Image[] = (data?.images ?? []) as Image[];

  return (
    <Stack direction={"row"} height={"100%"} spacing={4}>
      <LeftSideBarSettings isGeneratingImage={isGeneratingImage} />
      <Center images={images} isGeneratingImage={isGeneratingImage} mutate={() => mutate()} prompt={prompt} setPrompt={setPrompt} />
      <RightSideBarSettings />
    </Stack>
  );
};

export default ImageGeneration;
