import React from "react";
import { Stack } from "@mui/material";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useDisclosure } from "@nextui-org/modal";

import { imageContainerDimensions } from "../constants";

import ImageContainer from "./ImageContainer";

import { CloseIcon } from "@/assets/icons/icons";
import CustomModal from "@/components/modal/CustomModal";

interface UploadedImageProps {
  file: File;
  handleRemoveFile: (fileName: string) => void;
}

const UploadedImage = ({ file, handleRemoveFile }: UploadedImageProps) => {
  const imageUrl = URL.createObjectURL(file);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <ImageContainer>
      <Stack alignItems={"center"} height={"100%"} justifyContent={"center"} position={"relative"} onClick={onOpen}>
        <Stack direction={"row"} justifyContent={"space-between"} left={"0%"} p={1} position={"absolute"} top={"0%"} width={"100%"}>
          <Tooltip content="Remove" radius="sm">
            <Button isIconOnly size="sm" startContent={<CloseIcon className="w-[10px]" />} onClick={() => handleRemoveFile(file.name)} />
          </Tooltip>
        </Stack>
        <Image alt={file.name} height={imageContainerDimensions.height} src={imageUrl} width={imageContainerDimensions.width} />
      </Stack>
      <CustomModal
        body={
          <Stack alignItems={"center"} justifyContent={"center"}>
            <Image alt={file.name} height={imageContainerDimensions.height} src={imageUrl} width={imageContainerDimensions.width} />
          </Stack>
        }
        footer={
          <Stack>
            <Button radius="sm" variant="ghost" onClick={onOpenChange}>
              Close
            </Button>
          </Stack>
        }
        isOpen={isOpen}
        size="2xl"
        title={file.name}
        onOpenChange={onOpenChange}
      />
    </ImageContainer>
  );
};

export default UploadedImage;
