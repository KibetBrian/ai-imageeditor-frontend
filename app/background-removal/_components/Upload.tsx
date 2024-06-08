import React from "react";
import { Button } from "@nextui-org/button";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useDropzone } from "react-dropzone";
import { Stack } from "@mui/material";

import ImageContainer from "./ImageContainer";

import {
  AddImageIcon,
  ProcessImageIcon,
  UploadImageIcon,
} from "@/assets/icons/icons";

interface UploadInterface {
  files: File[];
  // eslint-disable-next-line no-unused-vars
  handleRemoveFile: (f: string) => void;
  handleTriggerInput: () => void;
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  // eslint-disable-next-line no-unused-vars
  onDrop: (acceptedFiles: File[]) => void;
  handleProcess: () => void;
  isProcessing: boolean;
}

const Upload = ({
  files,
  handleRemoveFile,
  fileInputRef,
  handleTriggerInput,
  onDrop,
  isProcessing,
  handleProcess,
}: UploadInterface) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex-1 p-1 w-full flex-col flex  justify-center h-full">
      {files.length === 0 && (
        <Stack alignItems={"center"} flex={2} justifyContent={"center"}>
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
            />
          </div>
        </Stack>
      )}

      {files.length > 0 && (
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
                <ImageContainer
                  key={f.name}
                  file={f}
                  handleRemoveFile={handleRemoveFile}
                  isProcessing={isProcessing}
                  type="upload"
                />
              );
            })}
          </Stack>
        </ScrollShadow>
      )}

      <Stack className="w-full" flex={1}>
        {files.length !== 0 && (
          <div className=" w-full flex items-center justify-end">
            <div {...getRootProps()}>
              <input
                ref={fileInputRef}
                multiple
                alt="image"
                className="hidden"
                type="image"
              />
            </div>

            <Stack direction={"row"} spacing={10}>
              <Button
                className="self-end"
                disabled={isProcessing}
                endContent={<AddImageIcon className="w-[20px]" />}
                radius="sm"
                type="button"
                variant="faded"
                onClick={handleTriggerInput}
              >
                Add Image
              </Button>
              <Button
                disabled={isProcessing}
                endContent={<ProcessImageIcon className="w-[20px]" />}
                isLoading={isProcessing}
                radius="sm"
                variant="solid"
                onClick={handleProcess}
              >
                {isProcessing ? "Removing background..." : "Remove background"}
              </Button>
            </Stack>
          </div>
        )}
      </Stack>
    </div>
  );
};

export default Upload;
