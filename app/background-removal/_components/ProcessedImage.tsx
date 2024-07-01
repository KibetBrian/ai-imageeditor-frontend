"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { useDisclosure } from "@nextui-org/modal";
import { Tooltip } from "@nextui-org/tooltip";
import ReactCompareImage from "react-compare-image";
import { useRouter } from "next/navigation";

import useBackgroundImageRemovalStore from "../state";
import { ProcessedImage as ProcessedImageType } from "../types";
import { imageContainerDimensions } from "../constants";
import { downloadImage } from "../utils";

import ImageContainer from "./ImageContainer";
import ImageSkeleton from "./ImageSkeleton";

import { CloseIcon, CompareImageIcon, DownloadIcon, DownloadImageIcon, EditIcon, ReloadIcon, WarningExclamation } from "@/assets/icons/icons";
import CustomModal from "@/components/modal/CustomModal";

interface ProcessedImageProps {
  processedImage: ProcessedImageType;
}

const ProcessedImage = ({ processedImage }: ProcessedImageProps) => {
  const router = useRouter();

  const [hovered, setHovered] = React.useState(false);

  const [imageCompare, setImageCompare] = React.useState(false);

  const { uploadedImages } = useBackgroundImageRemovalStore();

  const { onClose, isOpen, onOpenChange } = useDisclosure();

  const { imageName, base64Image, status, imageId } = processedImage;

  const { removeProcessedImage } = useBackgroundImageRemovalStore();

  const imageUrl = `data:image/png;base64,${base64Image}`;

  const uploadedImage = uploadedImages.find((image) => image.name === imageName);

  const uploadedImageURL = !uploadedImage ? "" : URL.createObjectURL(uploadedImage);

  return (
    <ImageContainer>
      {status === "failed" && (
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

      {status === "processing" && <ImageSkeleton />}

      {status === "processed" && (
        <Stack alignItems={"center"} display={"flex"} justifyContent={"center"} spacing={1} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <CustomModal
            body={
              <Stack alignItems={"center"} height={"100%"} justifyContent={"center"} spacing={2}>
                {imageCompare ? (
                  <Stack height={400} width={400}>
                    <ReactCompareImage
                      aspectRatio="wider"
                      leftImage={uploadedImageURL}
                      leftImageCss={{ width: "100%", height: "100%" }}
                      rightImage={imageUrl}
                      rightImageCss={{ width: "100%", height: "100%" }}
                    />
                  </Stack>
                ) : (
                  <Box
                    sx={{
                      width: imageContainerDimensions.width,
                      height: imageContainerDimensions.height,
                    }}
                  >
                    <img
                      alt={imageName}
                      src={imageUrl}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        transform: "scale(2)",
                      }}
                    />
                  </Box>
                )}
              </Stack>
            }
            footer={
              <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
                <Button radius="sm" size="sm" startContent={<EditIcon className="w-[15px]" />} variant="flat" onClick={() => router.push("/editor")}>
                  Edit
                </Button>
                <Button radius="sm" size="sm" startContent={<DownloadIcon className="w-[15px]" />} onClick={() => downloadImage(imageUrl, imageName)}>
                  Download
                </Button>
                <Button radius="sm" size="sm" variant="flat" onClick={onClose}>
                  Close
                </Button>
              </Stack>
            }
            header={
              <Stack alignItems={"start"} direction={"row"} justifyContent={"space-between"}>
                <Typography flex={1} variant="subtitle1">
                  {imageName}
                </Typography>

                <Stack direction={"row"} flex={1}>
                  <Button
                    radius="sm"
                    size="sm"
                    startContent={<CompareImageIcon className="w-[25px]" />}
                    variant={imageCompare ? "solid" : "bordered"}
                    onClick={() => setImageCompare((p) => !p)}
                  >
                    Compare
                  </Button>
                </Stack>
              </Stack>
            }
            height="80vh"
            isOpen={isOpen}
            width="100vw"
            onOpenChange={onOpenChange}
          />
          <Stack
            position={"absolute"}
            sx={{
              bottom: 0,
              left: 0,
              width: "100%",
              display: hovered ? "flex" : "none",
            }}
          >
            <Stack alignItems={"center"} direction={"row"} justifyContent={"space-between"} p={1}>
              <Tooltip content="Edit Image">
                <Button isIconOnly endContent={<EditIcon className="w-[15px]" />} size="sm" onClick={() => router.push("/editor")} />
              </Tooltip>
              <Tooltip content="Download Image">
                <Button isIconOnly endContent={<DownloadImageIcon className="w-[15px]" />} size="sm" onClick={() => downloadImage(imageUrl, imageName)} />
              </Tooltip>
            </Stack>
          </Stack>
          <Box
            sx={{
              width: imageContainerDimensions.width,
              height: imageContainerDimensions.height,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={onOpenChange}
          >
            <img
              alt={imageName}
              src={imageUrl}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </Box>
        </Stack>
      )}
    </ImageContainer>
  );
};

export default ProcessedImage;
