/* eslint-disable no-magic-numbers */
"use client";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { commonColors } from "@nextui-org/theme";
import { toast } from "sonner";
import { Stack, Typography } from "@mui/material";
import { Card } from "@nextui-org/card";
import { useDropzone } from "react-dropzone";
import { Button } from "@nextui-org/button";

import { ImageUploadIcon } from "@/assets/icons/icons";

interface UseImageUpload {
  multiple?: boolean;
}

interface ImageDimensions {
  width: number;
  height: number;
}

const validateImageDimensions = (dimensions: ImageDimensions) => {
  const minSideLength = 64;
  const maxPixelCount = 9437184;

  // Check if every side is at least 64 pixels
  if (dimensions.width < minSideLength || dimensions.height < minSideLength) {
    return {
      valid: false,
      message: "file too small, minimum allowed is 64x64 pixels",
    };
  }

  // Calculate total pixel count
  const totalPixels = dimensions.width * dimensions.height;

  // Check if total pixel count exceeds the maximum allowed
  if (totalPixels > maxPixelCount) {
    return {
      valid: false,
      message: "file too large, maximum allowed is 9437184 pixels",
    };
  }

  return {
    valid: true,
    message: "",
  };
};

const useImageUpload = ({ multiple = false }: UseImageUpload) => {
  const validTypes = useMemo(() => ["image/jpeg", "image/png", "image/webp"], []);

  const [files, setFiles] = useState<File[]>([]);

  const ToastComponent = ({ message, fileName }: { message: string; fileName: string }) => {
    return (
      <Card className="p-1 text-white" radius="sm" style={{ backgroundColor: commonColors.black }}>
        File with name
        <Typography variant="subtitle2">{fileName}</Typography>
        not accepted, {message}
      </Card>
    );
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dropzoneContainerRef = useRef<HTMLDivElement | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        if (!validTypes.includes(file.type)) {
          toast.custom(() => {
            return (
              <ToastComponent
                fileName={file.name}
                message="the only accepted file are of the following types .jpeg,
        .png and .webp"
              />
            );
          });

          continue;
        }

        const image = new Image();

        image.src = URL.createObjectURL(file);

        const isValidDimensions = await new Promise((resolve) => {
          image.onload = () => {
            const dimensions = {
              width: image.width,
              height: image.height,
            };

            const { valid, message } = validateImageDimensions(dimensions);

            if (!valid) {
              toast.custom(() => {
                return <ToastComponent fileName={file.name} message={message} />;
              });
            }

            resolve(valid);
          };
        });

        if (!isValidDimensions) {
          continue;
        }

        if (!multiple) {
          setFiles([file]);
          break;
        }

        setFiles((p) => [...p, file]);
      }
    },
    [multiple, validTypes],
  );

  const handleRemoveFile = useCallback((f: string) => {
    setFiles((p) => {
      return p.filter((file) => file.name !== f);
    });
  }, []);

  const handleTriggerInput = () => {
    fileInputRef.current?.click();
  };

  const handleClickDropzoneContainer = () => {
    dropzoneContainerRef.current?.click();
  };

  const DropzoneArea = () => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <div {...getRootProps()}>
        <Stack
          ref={dropzoneContainerRef}
          alignItems={"center"}
          borderRadius={2}
          height={400}
          justifyContent={"center"}
          spacing={4}
          style={{
            borderStyle: "dashed",
            borderColor: commonColors.zinc[500],
            borderWidth: "3px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            cursor: "pointer",
          }}
          width={500}
          onClick={handleClickDropzoneContainer}
        >
          <ImageUploadIcon />

          <input {...getInputProps()} ref={fileInputRef} accept="image/jpeg, image/png, image/webp" alt="image" className="hidden" multiple={multiple} type="file" />

          <Stack alignItems={"center"} spacing={1}>
            <Typography variant="subtitle1">{isDragActive ? "Drop your images here" : "Drag and drop your image here"}</Typography>
            OR
            <Typography variant="subtitle1">Click to select image</Typography>
          </Stack>
          <Button variant="flat" onClick={handleTriggerInput}>
            Upload Image
          </Button>
        </Stack>
      </div>
    );
  };

  return {
    files,
    handleRemoveFile,
    handleTriggerInput,
    DropzoneArea,
    handleClickDropzoneContainer,
  };
};

export default useImageUpload;
