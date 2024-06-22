import React from "react";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";

import { ProcessedImage as ProcessedImageType } from "../api/api";
import useBackgroundImageRemovalStore from "../state";

import ImageContainer from "./ImageContainer";

import { CloseIcon, DownloadImageIcon, ReloadIcon, WarningExclamation } from "@/assets/icons/icons";

interface ProcessedImageProps {
  processedImage: ProcessedImageType;
}

const ProcessedImage = ({ processedImage }: ProcessedImageProps) => {
  const { imageName, imageBase64, status, imageId } = processedImage;

  const { removeProcessedImage } = useBackgroundImageRemovalStore();

  const imageUrl = `data:image/png;base64,${imageBase64}`;

  const handleDownload = () => {
    const downloadAnchor = document.createElement("a");

    downloadAnchor.href = imageUrl;
    downloadAnchor.download = imageName;

    downloadAnchor.click();
  };

  return (
    <ImageContainer>
      {status !== "processed" && (
        <Stack alignItems={"center"} height={"100%"} justifyContent={"center"} position={"relative"} spacing={2}>
          <Stack direction={"row"} justifyContent={"space-between"} left={"0%"} position={"absolute"} top={"0%"} width={"100%"}>
            <Chip className="text-white" color="warning" radius="sm" size="sm" startContent={<WarningExclamation className="w-[15px]" />}>
              Failed
            </Chip>
            <Button isIconOnly endContent={<CloseIcon className="w-[20px]" />} radius="sm" size="sm" onClick={() => removeProcessedImage(imageId)} />
          </Stack>
          <Typography noWrap={false} overflow={"hidden"} textOverflow={"ellipsis"} variant="subtitle2">
            {" "}
            {imageName}
          </Typography>
          <Button endContent={<ReloadIcon className="w-[20px]" />} size="sm">
            Retry
          </Button>
        </Stack>
      )}
      {status === "processed" && (
        <Stack spacing={1}>
          <Typography variant="subtitle2"> {imageName.split("").slice(0, 10).join("")}</Typography>

          <Image alt={imageName} height={200} src={imageUrl} width={200} />

          <Stack alignItems={"center"} direction={"row"} justifyContent={"flex-end"}>
            <Button size="sm" startContent={<DownloadImageIcon className="w-[20px]" />} onClick={handleDownload} />
          </Stack>
        </Stack>
      )}
    </ImageContainer>
  );
};

export default ProcessedImage;
