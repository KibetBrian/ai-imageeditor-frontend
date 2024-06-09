"use client";
import React, { useCallback, useRef, useState } from "react";
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

const useImageUpload = ({ multiple = false }: UseImageUpload) => {
  const [files, setFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dropzoneContainerRef = useRef<HTMLDivElement | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];

      for (const file of acceptedFiles) {
        if (!validTypes.includes(file.type)) {
          toast.custom(() => {
            return (
              <Card
                className="p-1 text-white"
                radius="sm"
                style={{ backgroundColor: commonColors.black }}
              >
                File with name
                <Typography variant="subtitle2">{file.name}</Typography>
                not accepted, the only accepted file are of the following types
                .jpeg, .png and .webp
              </Card>
            );
          });

          continue;
        }
        if (multiple) {
          setFiles((p) => [...p, file]);
        } else {
          setFiles([file]);
        }
      }
    },
    [multiple],
  );

  const handleRemoveFile = (f: string) => {
    setFiles((p) => {
      return p.filter((file) => file.name !== f);
    });
  };

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
          borderRadius={5}
          height={400}
          justifyContent={"center"}
          spacing={4}
          style={{
            borderStyle: "dashed",
            borderColor: "#fff",
            borderWidth: "2px",
            cursor: "pointer",
          }}
          width={500}
          onClick={handleClickDropzoneContainer}
        >
          <ImageUploadIcon />

          <input
            {...getInputProps()}
            ref={fileInputRef}
            accept="image/jpeg, image/png, image/webp"
            alt="image"
            className="hidden"
            multiple={multiple}
            type="file"
          />

          <Stack alignItems={"center"} spacing={1}>
            <Typography variant="subtitle1">
              {isDragActive
                ? "Drop your images here"
                : "Drag and drop your image here"}
            </Typography>
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
