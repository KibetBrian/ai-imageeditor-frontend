/* eslint-disable no-magic-numbers */
import { Stack, Typography } from "@mui/material";
import { Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { commonColors } from "@nextui-org/theme";
import React, { useEffect, useState } from "react";
import { Card } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Switch } from "@nextui-org/switch";
import { Button } from "@nextui-org/button";

import { useImageGenerationStore } from "../state";
import { models, negativePromptsDefaultValue } from "../constants";

import { cn } from "@/utils/utils";

interface LeftSideBarSettingsProps {
  isGeneratingImage: boolean;
}

const LeftSideBarSettings = ({ isGeneratingImage }: LeftSideBarSettingsProps) => {
  const [cost, setCost] = useState(0);

  const { model, setModel, numberofImagesToGenerate, setNumberofImagesToGenerate, setNegativePromptActive, negativePromptActive, setNegativePrompt } = useImageGenerationStore();

  useEffect(() => {
    const newCost = model.cost * numberofImagesToGenerate;

    setCost(newCost);
  }, [model, numberofImagesToGenerate]);

  return (
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
                    isDisabled={isGeneratingImage}
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
  );
};

export default LeftSideBarSettings;
