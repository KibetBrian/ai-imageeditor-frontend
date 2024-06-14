/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines-per-function */
"use client";
import { Stack, Typography } from "@mui/material";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import React, { useEffect, useState } from "react";
import { Card } from "@nextui-org/card";
import { Select, SelectItem } from "@nextui-org/select";
import { Divider } from "@nextui-org/divider";
import { Switch } from "@nextui-org/switch";
import { Checkbox } from "@nextui-org/checkbox";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { commonColors } from "@nextui-org/theme";
import { StatusCodes } from "http-status-codes";

import { aspectRatiosData, models, negativePromptsDefaultValue, seedMaxValue } from "./constants";
import Image from "./_components/Image";
import LoadingImageSkeleton from "./_components/LoadingImageSkeleton";
import { useImageGenerationStore } from "./state";

import { GeneratePhotoIcon } from "@/assets/icons/icons";
import AspectRatio from "@/components/aspect_ratio";
import { cn } from "@/utils/utils";
import useHandleFetchError from "@/hooks/useHandleError";
import { appConfigs } from "@/config/app";

const ImageGeneration = () => {
  const handleFetchError = useHandleFetchError();

  const {
    model,
    seed,
    setSeed,
    setModel,
    aspectRatio,
    setSeedRandomized,
    seedRandomized,
    negativePrompt,
    setAspectRatio,
    setNegativePrompt,
    negativePromptActive,
    setNegativePromptActive,
    numberofImagesToGenerate,
    setNumberofImagesToGenerate,
  } = useImageGenerationStore();

  const [cost, setCost] = useState(0);

  const [prompt, setPrompt] = useState("");

  const { mutate, isPending, data } = useMutation({
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
    onSuccess: () => {},
  });

  const images: string[] = data?.images ?? [];

  // eslint-disable-next-line no-magic-numbers
  const cardPlacementDeterminant = numberofImagesToGenerate % 2 !== 1 || numberofImagesToGenerate === 1;

  useEffect(() => {
    const modelCost = model.cost;

    const totalCost = modelCost * numberofImagesToGenerate;

    setCost(totalCost);
  }, [model, numberofImagesToGenerate]);

  return (
    <Stack direction={"row"} height={"100%"} spacing={4}>
      <Stack flex={1} justifyContent={"flex-end"} pb={2}>
        <Card className="p-2" radius="sm">
          <Stack spacing={3}>
            <Stack>
              <Typography variant="caption">Model</Typography>
              <Select
                isRequired
                radius="sm"
                selectedKeys={[model.name]}
                variant="faded"
                onChange={(e) => {
                  setModel(models.find((m) => m.name === e.target.value) ?? models[0]);
                }}
              >
                {models.map((m) => (
                  <SelectItem key={m.name} textValue={m.name} variant="faded">
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Stack>
                        <Typography sx={{ color: commonColors.zinc[200] }} variant="subtitle2">
                          {m.name}
                        </Typography>
                        <Typography sx={{ color: commonColors.zinc[300] }} variant="caption">
                          {m.description}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography>{m.cost}</Typography>
                      </Stack>
                    </Stack>
                  </SelectItem>
                ))}
              </Select>
            </Stack>
            <Divider className="h-[2px]" />
            <Stack>
              <Typography variant="caption">Number of images</Typography>
              <Stack direction={"row"} flexWrap={"wrap"}>
                {Array.from({ length: 4 }).map((_, i) => {
                  return (
                    <Button
                      key={i}
                      className="mr-1 mb-1"
                      isDisabled={isPending}
                      size="sm"
                      variant={numberofImagesToGenerate === i + 1 ? "solid" : "bordered"}
                      onClick={() => setNumberofImagesToGenerate(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  );
                })}
              </Stack>
            </Stack>

            <Stack spacing={2}>
              <Stack alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
                <Typography variant="subtitle2">Negative Prompt</Typography>
                <Switch
                  aria-label="Negative prompt"
                  classNames={{ wrapper: "rounded-xm" }}
                  isSelected={negativePromptActive}
                  size="sm"
                  onChange={() => setNegativePromptActive(!negativePromptActive)}
                />
              </Stack>
              <Textarea
                className={cn(`max-w-xs ${negativePromptActive ? "block" : "hidden"}`)}
                defaultValue={negativePromptsDefaultValue}
                placeholder="Things you don't want to see in the image"
                variant="faded"
                onChange={(e) => setNegativePrompt(e.target.value)}
              />
            </Stack>

            <Stack alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
              <Typography variant="subtitle2">Cost/Successful Generation</Typography>
              <Button isDisabled endContent={<Typography>{cost}</Typography>} size="sm" variant="solid" />
            </Stack>
          </Stack>
        </Card>
      </Stack>
      <Stack flex={4} height={"100%"} justifyContent={"flex-end"} pb={2} spacing={2}>
        <Stack alignItems={"center"}>
          <Typography variant="subtitle2">Generate images will appear hare</Typography>

          <Stack alignItems={"center"} justifyContent={"center"} spacing={1}>
            <Stack direction={"row"} flexWrap={"wrap"} justifyContent={cardPlacementDeterminant ? "center" : "start"}>
              {isPending && Array.from({ length: numberofImagesToGenerate }).map((_, i) => <LoadingImageSkeleton key={`img${i}`} numberOfImages={numberofImagesToGenerate} />)}

              <Stack direction={"row"} flexWrap={"wrap"} justifyContent={cardPlacementDeterminant ? "center" : "start"}>
                {images.map((img) => (
                  <Image key={img} img={img} numberOfImages={numberofImagesToGenerate} />
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
            <Button endContent={<GeneratePhotoIcon className="h-[20px]" />} isDisabled={!prompt} isLoading={isPending} size="sm" variant="solid" onClick={() => mutate()}>
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
      <Stack flex={1} justifyContent={"flex-end"} pb={2}>
        <Card className="p-2" radius="sm">
          <Stack spacing={2}>
            <Stack>
              <Typography variant="caption">Aspect Ratio</Typography>
              <Select
                radius="sm"
                selectedKeys={[aspectRatio.name]}
                startContent={<AspectRatio ratio={aspectRatio.ratio} />}
                variant="faded"
                onChange={(e) => {
                  setAspectRatio(aspectRatiosData.find((aR) => aR.name === e.target.value) ?? aspectRatiosData[0]);
                }}
              >
                {aspectRatiosData.map((aR) => (
                  <SelectItem key={aR.name} textValue={aR.name} variant="solid">
                    <Stack alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
                      {aR.name}
                      <AspectRatio ratio={aR.ratio} />
                    </Stack>
                  </SelectItem>
                ))}
              </Select>
            </Stack>

            <Stack>
              <Typography variant="caption">Seed {!seedRandomized && <span>, max: {seedMaxValue}</span>}</Typography>

              <Input
                disabled={seedRandomized}
                max={seedMaxValue}
                size="sm"
                type="number"
                value={seedRandomized ? "" : String(seed)}
                variant="faded"
                onChange={(e) => {
                  const number = Number(e.target.value);

                  if (number > seedMaxValue) return;

                  if (isNaN(number)) return;

                  setSeed(number);
                }}
              />
              <Checkbox isSelected={seedRandomized} size="sm" onChange={() => setSeedRandomized(!seedRandomized)}>
                Randomized
              </Checkbox>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
};

export default ImageGeneration;
