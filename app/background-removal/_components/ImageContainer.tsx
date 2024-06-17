"use client";
import React, { useRef } from "react";
import { Card } from "@nextui-org/card";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import ReactCompareImage from "react-compare-image";
import { Tooltip } from "@nextui-org/tooltip";

import { imageContainerDimensions } from "../constants";
import { MimeTypeFile } from "../types";
import { getImageUrlFromMimeTypeFile } from "../utils";

import { CloseIcon, DownloadImageIcon } from "@/assets/icons/icons";
import { cn } from "@/utils/utils";

interface ImageContainerBaseProps {
  type: "upload" | "results";
}

interface ImageContainerWithHeader extends ImageContainerBaseProps {
  type: "upload";
  file: File;
  isProcessing: boolean;
  // eslint-disable-next-line no-unused-vars
  handleRemoveFile: (fileName: string) => void;
}

interface ImageContainerWIthoutHeader extends ImageContainerBaseProps {
  type: "results";
  file: MimeTypeFile;
}

type ImageContainerProps = ImageContainerWIthoutHeader | ImageContainerWithHeader;

const ImageContainer = ({ file, type, ...props }: ImageContainerProps) => {
  const downloadAnchorRef = useRef<HTMLAnchorElement | null>(null);

  const { isOpen: isImageModalOpen, onOpen: onImageModalOpen, onClose: closeImageModal, onOpenChange } = useDisclosure();

  const getImageUrl = () => {
    if (type === "upload") return URL.createObjectURL(file);

    return getImageUrlFromMimeTypeFile(file);
  };

  const handleDownload = (downloadUrl: string) => {
    if (!downloadAnchorRef.current) return;
    // Create a URL for the Blob
    downloadAnchorRef.current.href = downloadUrl;
    downloadAnchorRef.current.download = file.name;
    // Trigger the download
    downloadAnchorRef.current.click();
    closeImageModal();
    // Cleanup the URL after the download
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={onImageModalOpen}>
      <Card key={file.name} isHoverable className={cn(`p-1 h-[${imageContainerDimensions.height}px] cursor-pointer space-y-1 w-[${imageContainerDimensions.width}px] mb-1 mr-1`)}>
        <div className="flex items-center justify-between">
          <Typography variant="subtitle2">
            {" "}
            {/* eslint-disable-next-line no-magic-numbers */}
            {file.name.split("").slice(0, 10).join("")}
          </Typography>
          {type === "upload" && props && "isProcessing" in props && (
            <Tooltip content="Remove" radius="sm">
              <Button isIconOnly disabled={props.isProcessing} size="sm" startContent={<CloseIcon className="w-[10px]" />} onClick={() => props.handleRemoveFile(file.name)} />
            </Tooltip>
          )}
        </div>

        <Image alt={file.name} height={200} objectFit="contain" src={getImageUrl()} width={200} />
        {type === "results" && (
          <Stack alignItems={"center"} direction={"row"} justifyContent={"flex-end"}>
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */}
            <a ref={downloadAnchorRef} style={{ display: "none" }} />
            <Button
              size="sm"
              startContent={<DownloadImageIcon className="w-[20px]" />}
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(getImageUrl());
              }}
            />
          </Stack>
        )}

        {isImageModalOpen && (
          <Modal backdrop="blur" radius="sm" isOpen={isImageModalOpen} scrollBehavior="inside" size="4xl" onOpenChange={onOpenChange}>
            <ModalContent>
              {(onclose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">{file.name}</ModalHeader>
                  <ModalBody>
                    <Stack alignItems={"center"} justifyContent={"center"}>
                      {type === "results" ? (
                        <ReactCompareImage
                          leftImage={getImageUrl()}
                          rightImage="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/lady-2.png"
                        />
                      ) : (
                        <Image alt={file.name} height={400} objectFit="contain" src={getImageUrl()} width={400} />
                      )}
                    </Stack>
                  </ModalBody>
                  <ModalFooter className="flex  justify-between items-center ">
                    <Button onClick={onclose}>Close</Button>
                    {/* eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */}
                    <a ref={downloadAnchorRef} style={{ display: "none" }} />
                    {type === "results" && (
                      <Tooltip content="Download" radius="sm">
                        <Button endContent={<DownloadImageIcon className="w-[20px]" />} onClick={() => handleDownload(getImageUrl())}>
                          Download
                        </Button>
                      </Tooltip>
                    )}
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
      </Card>
    </div>
  );
};

export default ImageContainer;
