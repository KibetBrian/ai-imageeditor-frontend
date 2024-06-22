"use client";
import { Stack, Typography } from "@mui/material";
import { Select, SelectItem } from "@nextui-org/select";
import { Textarea } from "@nextui-org/input";
import { Slider } from "@nextui-org/slider";
import React, { useEffect, useState } from "react";

import Upload from "../background-removal/_components/Upload";

import useFileUpload from "@/hooks/useFileUpload";

type UpscaleMode = "Conservative" | "Creative";

type OutputFormat = "jpeg" | "png" | "webp";

const upscaleModes = [
  {
    title: "Conservative",
    description: "Conservative Upscale preserves image details with minimal alterations",
  },
  {
    title: "Creative",
    description: "Creative Upscale is ideal for degraded images, heavily reimagining them (adjustable creativity scale).",
  },
];

const outputFormats: OutputFormat[] = ["jpeg", "png", "webp"];

const Upscale = () => {
  const [upscaleMode, setUpscaleMode] = useState<UpscaleMode>(upscaleModes[0].title as UpscaleMode);

  const [outputMode, setOutputMode] = useState(outputFormats[0]);

  const conservativeDefaultCreativityValue = 0.35;

  const creativityDefaultCreativityValue = 0.3;

  const [creativityValue, setCreativityValue] = useState(0);

  const { fileInputRef, files, handleRemoveFile, handleTriggerInput, onDrop } = useFileUpload();

  useEffect(() => {
    if (upscaleMode === "Conservative") {
      setCreativityValue(conservativeDefaultCreativityValue);
    } else {
      setCreativityValue(creativityDefaultCreativityValue);
    }
  }, [upscaleMode]);

  const handleProcess = () => {};

  return (
    <Stack direction={"row"} height={"100%"} overflow={"hidden"}>
      <Stack flex={1}>
        <Typography variant="subtitle2">Settings</Typography>

        <Stack pl={1} pr={1} spacing={4}>
          <Select
            isRequired
            className="max-w-xs"
            label="Upscale Mode"
            selectedKeys={[upscaleMode]}
            size="sm"
            value={upscaleMode}
            onChange={(e) => setUpscaleMode(e.target.value as UpscaleMode)}
          >
            {upscaleModes.map((uM) => (
              <SelectItem key={uM.title}>{uM.title}</SelectItem>
            ))}
          </Select>

          <Textarea className="max-w-xs" isRequired={upscaleMode === "Creative"} label="Prompt" placeholder="Enter your description" size="lg" variant="bordered" />

          <Textarea className="max-w-xs" label="Negative prompt" placeholder="Enter your description" size="sm" variant="bordered" />

          <Slider className="max-w-md" getValue={(donuts) => `${donuts} of 60 Donuts`} label="Creativity" maxValue={60} size="sm" />

          <Select
            isRequired
            className="max-w-xs"
            label="Output format"
            selectedKeys={[outputMode]}
            size="sm"
            value={outputMode}
            onChange={(e) => setOutputMode(e.target.value as OutputFormat)}
          >
            {outputFormats.map((f) => (
              <SelectItem key={f}>{f}</SelectItem>
            ))}
          </Select>
        </Stack>
      </Stack>
      <Stack flex={2}>
        <Typography variant="subtitle2">Images to upscale</Typography>
        <Upload
          fileInputRef={fileInputRef}
          files={files}
          handleProcess={handleProcess}
          handleRemoveFile={handleRemoveFile}
          handleTriggerInput={handleTriggerInput}
          isProcessing={false}
          processTitle={"Upscale"}
          processingTitle="Upscaling"
          onDrop={onDrop}
        />
      </Stack>
      <Stack flex={2}>Rigth</Stack>
    </Stack>
  );
};

export default Upscale;
