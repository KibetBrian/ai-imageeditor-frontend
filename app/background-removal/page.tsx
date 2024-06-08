"use client";
import React, { useRef, useCallback, useState } from "react";
import { Typography } from "@mui/material";
import { toast } from "sonner";
import { commonColors } from "@nextui-org/theme";
import { Card } from "@nextui-org/card";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import Upload from "./_components/Upload";
import Results from "./_components/Results";
import { MimeTypeFile } from "./types";

import useHandleFetchError from "@/hooks/useHandleError";
import { appConfigs } from "@/config/app";

const BackgroundRemoval = () => {
  const handleFetchError = useHandleFetchError();

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
              accepted, the only accepted file are of the following types .jpeg, .png and
              .webp
            </Card>
          );
        });

        continue;
      }
      setFiles((p) => [...p, file]);
    }
  }, []);

  const handleRemoveFile = (f: string) => {
    setFiles((p) => {
      return p.filter((file) => file.name !== f);
    });
  };

  const handleTriggerInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    const formData = new FormData();

    files.forEach((f) => {
      formData.append("files", f);
    });

    const response = await axios({
      method: "post",
      url: `${appConfigs.backend}process/background-removal`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };

  const { mutate, data, isPending } = useMutation({
    mutationFn: handleUpload,
    onError: (e) => handleFetchError({ error: e }),
  });

  const processedFiles: MimeTypeFile[] = data?.files || [];

  return (
    <div className="h-full w-full p-2 overflow-hidden">
      <div>
        <Typography variant="h5">Image Background Removal</Typography>
      </div>
      <div className="flex h-full">
        <Upload
          fileInputRef={fileInputRef}
          files={files}
          handleProcess={mutate}
          handleRemoveFile={handleRemoveFile}
          handleTriggerInput={handleTriggerInput}
          isProcessing={isPending}
          onDrop={onDrop}
        />

        {(processedFiles.length > 0 || files.length > 0) && (
          <Results
            files={processedFiles}
            filesLength={files.length}
            isProcessing={isPending}
          />
        )}
      </div>
    </div>
  );
};

export default BackgroundRemoval;
