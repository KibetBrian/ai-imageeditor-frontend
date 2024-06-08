"use client";
import React, { useCallback, useRef, useState } from "react";
import { commonColors } from "@nextui-org/theme";
import { toast } from "sonner";
import { Typography } from "@mui/material";
import { Card } from "@nextui-org/card";

const useFileUpload = () => {
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
              accepted, the only accepted file are of the following types .jpeg,
              .png and .webp
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

  return { files, fileInputRef, onDrop, handleRemoveFile, handleTriggerInput };
};

export default useFileUpload;
