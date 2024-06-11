"use client";
import { Stack, Typography } from "@mui/material";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import React from "react";
import { Card } from "@nextui-org/card";
import { Select, SelectItem } from "@nextui-org/select";
import { Divider } from "@nextui-org/divider";
import { Switch } from "@nextui-org/switch";
import { Checkbox } from "@nextui-org/checkbox";

import { aspectRatiosData } from "./constants";

import { GeneratePhotoIcon } from "@/assets/icons/icons";
import AspectRatio from "@/components/aspect_ratio";

const models = [
  {
    name: "Stable diffusion",
    description: "A stable diffusion model",
  },
  {
    name: "Stable diffusion",
    description: "A stable diffusion model",
  },
  {
    name: "Stable diffusion",
    description: "A stable",
  },
];

const negativePromptsDefaultValue =
  "ugly, deformed, noisy, blurry, distorted, out of focus, bad anatomy, extra limbs, poorly drawn face, poorly drawn hands, missing fingers, nudity, nude";

const ImageGeneration = () => {
  const [negativePromptActive, setNegativePromptActive] = React.useState(false);

  const [selectedAspectRatio, setSelectedAspectRatio] = React.useState(
    aspectRatiosData[0],
  );

  const [aspectRationSelectOpen, setAspectRationSelectOpen] =
    React.useState(false);

  const [numberOfImages, setNumberOfImages] = React.useState(1);

  return (
    <Stack direction={"row"} height={"100%"} spacing={4}>
      <Stack flex={1} justifyContent={"flex-end"} pb={2}>
        <Card className="p-2" radius="sm">
          <Stack spacing={3}>
            <Stack>
              <Typography variant="caption">Model</Typography>
              <Select radius="sm" variant="faded">
                {models.map((animal) => (
                  <SelectItem key={animal.name} variant="solid">
                    {animal.name}
                  </SelectItem>
                ))}
              </Select>
            </Stack>
            <Divider className="h-[2px]" />
            <Stack>
              <Typography variant="caption">Number of images</Typography>
              <Stack direction={"row"} flexWrap={"wrap"}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Button
                    key={i}
                    className="mr-1 mb-1"
                    size="sm"
                    variant={numberOfImages === i + 1 ? "solid" : "bordered"}
                    onClick={() => setNumberOfImages(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </Stack>
            </Stack>

            <Stack spacing={2}>
              <Stack
                alignItems={"center"}
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Typography variant="subtitle2">Negative Prompt</Typography>
                <Switch
                  aria-label="Negative prompt"
                  classNames={{ wrapper: "rounded-xm" }}
                  isSelected={negativePromptActive}
                  size="sm"
                  onChange={() => setNegativePromptActive((p) => !p)}
                />
              </Stack>
              {negativePromptActive && (
                <Textarea
                  className="max-w-xs"
                  defaultValue={negativePromptsDefaultValue}
                  placeholder="Things you don't want to see in the image"
                  variant="faded"
                />
              )}
            </Stack>
          </Stack>
        </Card>
      </Stack>
      <Stack flex={4} height={"100%"} justifyContent={"space-between"} pb={2}>
        <Stack alignItems={"center"}>
          <Typography variant="subtitle2">
            Generate images will appear hare
          </Typography>
        </Stack>
        <Textarea
          classNames={{
            inputWrapper: "h-[80px]",
          }}
          endContent={
            <Button
              endContent={<GeneratePhotoIcon className="h-[20px]" />}
              size="sm"
              variant="solid"
            >
              Generate
            </Button>
          }
          placeholder="Prompt"
          radius="sm"
          size="lg"
          variant="faded"
        />
      </Stack>
      <Stack flex={1} justifyContent={"flex-end"} pb={2}>
        <Card className="p-2" radius="sm">
          <Stack spacing={2}>
            <Stack>
              <Typography variant="caption">Aspect Ration</Typography>
              <Select
                isOpen={aspectRationSelectOpen}
                radius="sm"
                startContent={<AspectRatio ratio={selectedAspectRatio.ratio} />}
                variant="faded"
                onChange={(e) => {
                  setSelectedAspectRatio(
                    aspectRatiosData.find((aR) => aR.name === e.target.value) ??
                      aspectRatiosData[0],
                  );
                }}
                onOpenChange={(open) => {
                  if (open === aspectRationSelectOpen) return;
                  setAspectRationSelectOpen(open);
                }}
              >
                {aspectRatiosData.map((aR) => (
                  <SelectItem key={aR.name} variant="solid">
                    {!aspectRationSelectOpen ? (
                      aR.name
                    ) : (
                      <Stack
                        alignItems={"center"}
                        direction={"row"}
                        justifyContent={"space-between"}
                      >
                        {aR.name}
                        <AspectRatio ratio={aR.ratio} />
                      </Stack>
                    )}
                  </SelectItem>
                ))}
              </Select>
            </Stack>

            <Stack>
              <Typography variant="caption">Seed</Typography>
              <Input size="sm" variant="faded" />
              <Checkbox defaultSelected size="sm">
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
