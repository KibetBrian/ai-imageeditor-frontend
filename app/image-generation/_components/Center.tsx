/* eslint-disable no-magic-numbers */
import React from "react";
import { Stack, Typography } from "@mui/material";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { useImageGenerationStore } from "../state";
import { Image as ImageType } from "../types";

import LoadingImageSkeleton from "./LoadingImageSkeleton";
import Image from "./Image";

import { GeneratePhotoIcon } from "@/assets/icons/icons";

interface CenterProps {
  isGeneratingImage: boolean;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  images: ImageType[];
  mutate: () => void;
}

const Center = ({ isGeneratingImage, setPrompt, images, mutate }: CenterProps) => {
  const { numberofImagesToGenerate } = useImageGenerationStore();

  const cardPlacementDeterminant = numberofImagesToGenerate % 2 !== 1 || numberofImagesToGenerate === 1;

  return (
    <Stack flex={4} height={"100%"} justifyContent={"flex-end"} pb={2} spacing={2}>
      <Stack alignItems={"center"}>
        <Typography variant="subtitle2">Generate images will appear hare</Typography>

        <Stack alignItems={"center"} justifyContent={"center"} spacing={1}>
          <Stack direction={"row"} flexWrap={"wrap"} justifyContent={cardPlacementDeterminant ? "center" : "start"}>
            {isGeneratingImage &&
              Array.from({ length: numberofImagesToGenerate }).map((_, i) => <LoadingImageSkeleton key={`img${i}`} numberOfImages={numberofImagesToGenerate} />)}

            <Stack direction={"row"} flexWrap={"wrap"} justifyContent={cardPlacementDeterminant ? "center" : "start"}>
              {images.map((img) => (
                <Image key={img.url} img={img.url} numberOfImages={numberofImagesToGenerate} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Textarea
        classNames={{
          inputWrapper: "h-[80px]",
        }}
        endContent={
          <Button endContent={<GeneratePhotoIcon className="h-[20px]" />} isDisabled={!prompt} isLoading={isGeneratingImage} size="sm" variant="solid" onClick={() => mutate()}>
            Generate
          </Button>
        }
        placeholder="Prompt"
        radius="sm"
        size="lg"
        variant="faded"
        onChange={(e) => setPrompt(e.target.value)}
      />
    </Stack>
  );
};

export default Center;
