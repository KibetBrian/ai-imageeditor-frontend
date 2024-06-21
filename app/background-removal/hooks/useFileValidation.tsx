"use client";
import { Typography } from "@mui/material";
import { Card } from "@nextui-org/card";
import { commonColors } from "@nextui-org/theme";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";

const useFileUploadValidation = () => {
  const [files, setFiles] = useState<File[]>([]);

  const removeFile = useCallback((f: string) => {
    setFiles((p) => {
      return p.filter((file) => file.name !== f);
    });
  }, []);

  const validate = useCallback((acceptedFiles: File[]) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    for (const file of acceptedFiles) {
      if (!validTypes.includes(file.type)) {
        toast.custom(() => {
          return (
            <Card className="p-1 text-white" radius="sm" style={{ backgroundColor: commonColors.black }}>
              File with name <Typography variant="subtitle2">{file.name}</Typography> not accepted, the only accepted file are of the following types {validTypes.join(", ")}
            </Card>
          );
        });

        continue;
      }
      setFiles((p) => [...p, file]);
    }
  }, []);

  return { validate, files, removeFile };
};

export default useFileUploadValidation;
