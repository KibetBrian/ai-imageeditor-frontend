import { Stack, Typography } from "@mui/material";
import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { Card } from "@nextui-org/card";

import { aspectRatiosData, seedMaxValue } from "../constants";
import { useImageGenerationStore } from "../state";

import AspectRatio from "@/components/aspect_ratio";

const RightSideBarSettings = () => {
  const { aspectRatio, setAspectRatio, seed, seedRandomized, setSeed, setSeedRandomized } = useImageGenerationStore();

  return (
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
  );
};

export default RightSideBarSettings;
