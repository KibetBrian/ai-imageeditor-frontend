"use client";
import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { useRouter } from "next/navigation";

import { getImageDimensions } from "../utils";
import { imageContainerDimensions } from "../constants";

import ImageContainer from "./ImageContainer";

import { CloseIcon, EditIcon } from "@/assets/icons/icons";
import CustomModal from "@/components/modal/CustomModal";
import useMounted from "@/hooks/useMounted";

interface UploadedImageProps {
  uploadedImage: File;
  handleRemoveImage: (image: string) => void;
}

const UploadedImage = ({ uploadedImage, handleRemoveImage }: UploadedImageProps) => {
  const mounted = useMounted();

  const [imageProperties, setImageProperties] = useState<{ width: number; height: number; url: string } | null>(null);

  useEffect(() => {
    getImageDimensions(uploadedImage).then((properties) => {
      setImageProperties(properties);
    });
  }, [uploadedImage]);

  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (!mounted) return null;

  return (
    <ImageContainer>
      <Stack alignItems={"center"} height={"100%"} justifyContent={"center"} position={"relative"} onClick={onOpen}>
        <Stack direction={"row"} justifyContent={"space-between"} left={"0%"} p={1} position={"absolute"} top={"0%"} width={"100%"}>
          <Tooltip content="Remove" radius="sm">
            <Button isIconOnly size="sm" startContent={<CloseIcon className="w-[10px]" />} onClick={() => handleRemoveImage(uploadedImage.name)} />
          </Tooltip>
        </Stack>
        <img
          alt={uploadedImage.name}
          src={imageProperties?.url}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      </Stack>
      <CustomModal
        body={
          <Stack alignItems={"center"} height={"100%"} justifyContent={"center"}>
            <Box
              sx={{
                width: imageContainerDimensions.width,
                height: imageContainerDimensions.height,
              }}
            >
              <img
                alt={uploadedImage.name}
                src={imageProperties?.url}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  transform: "scale(2)",
                }}
              />
            </Box>
          </Stack>
        }
        footer={
          <Stack alignItems={"center"} direction={"row"} spacing={2}>
            <Button endContent={<EditIcon className="w-[20px]" />} radius="sm" size="sm" onClick={() => router.push("/editor")}>
              Edit
            </Button>
            <Button radius="sm" size="sm" variant="ghost" onClick={onOpenChange}>
              Close
            </Button>
          </Stack>
        }
        header={
          <Stack>
            <Typography variant="subtitle1">{uploadedImage.name}</Typography>
          </Stack>
        }
        height="80vh"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </ImageContainer>
  );
};

export default UploadedImage;
