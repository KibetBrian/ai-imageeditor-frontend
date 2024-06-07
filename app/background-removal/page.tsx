"use client";
import React, { useRef, useCallback, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { commonColors } from "@nextui-org/theme";
import { Card } from "@nextui-org/card";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import {
  AddImageIcon,
  CloseIcon,
  ProcessImageIcon,
  UploadImageIcon,
} from "@/assets/icons/icons";

const BackgroundRemoval = () => {
  const [files, setFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
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
              File with name{" "}
              <Typography variant="subtitle2">{file.name}</Typography> not
              accepted, the only accepted file extensions are .jpeg, .png and
              .webp
            </Card>
          );
        });

        continue;
      }

      setFiles((p) => [...p, file]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleFileSelect = () => {};

  const handleRemoveFile = (f: string) => {
    setFiles((p) => {
      return p.filter((file) => file.name !== f);
    });
  };

  const handleTriggerInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="h-full w-full p-2 overflow-hidden">
      <div>
        <Typography variant="h5">Image Background Removal</Typography>
      </div>
      <div className="flex h-full">
        <div className="flex-1 w-full flex-col flex justify-center h-full">
          {files.length === 0 && (
            <Stack className="flex-2">
              <div
                {...getRootProps()}
                className=" w-[80%] border-2 border-dashed  rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 "
              >
                <UploadImageIcon className="w-12 h-12 dark:text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">
                  {isDragActive
                    ? "Drop the files here"
                    : "Drag and drop your files here"}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Or click to select files
                </p>
                <p>Accepted formats: .png, .jpeg, .webp</p>
                <input
                  {...getInputProps()}
                  ref={fileInputRef}
                  multiple
                  alt="image"
                  className="hidden"
                  type="image"
                  onChange={handleFileSelect}
                />
              </div>
            </Stack>
          )}

          <ScrollShadow hideScrollBar className="flex-[5]">
            <Stack
              direction={"row"}
              flex={5}
              flexWrap={"wrap"}
              p={1}
              style={{ overflowY: "scroll" }}
            >
              {files.map((f) => {
                return (
                  <Card
                    key={f.name}
                    isHoverable
                    className="p-1 h-[220px] w-[220px] mb-1 mr-1"
                  >
                    <div className="flex items-center justify-between">
                      <Typography variant="subtitle2">
                        {" "}
                        {/* eslint-disable-next-line no-magic-numbers */}
                        {f.name.split("").slice(0, 10).join("")}
                      </Typography>
                      <Button
                        isIconOnly
                        size="sm"
                        startContent={<CloseIcon className="w-[10px]" />}
                        onClick={() => handleRemoveFile(f.name)}
                      />
                    </div>
                    <Image
                      alt={f.name}
                      height={200}
                      src={URL.createObjectURL(f)}
                      width={200}
                    />
                  </Card>
                );
              })}
            </Stack>
          </ScrollShadow>

          <Stack className="w-full" flex={1}>
            {files.length !== 0 && (
              <div
                className=" w-full flex items-center justify-end"
                {...getRootProps()}
              >
                <input
                  ref={fileInputRef}
                  multiple
                  alt="image"
                  className="hidden"
                  type="image"
                  onChange={handleFileSelect}
                />
                <Stack direction={"row"} spacing={10}>
                  <Button
                    className="self-end"
                    endContent={<AddImageIcon className="w-[20px]" />}
                    radius="sm"
                    type="button"
                    variant="faded"
                    onClick={handleTriggerInput}
                  >
                    Add Image
                  </Button>
                  <Button
                    endContent={<ProcessImageIcon className="w-[20px]" />}
                    radius="sm"
                    variant="solid"
                  >
                    Remove Background
                  </Button>
                </Stack>
              </div>
            )}
          </Stack>
        </div>
        <div className=" flex-1">Right</div>
      </div>
    </div>
  );
};

export default BackgroundRemoval;
