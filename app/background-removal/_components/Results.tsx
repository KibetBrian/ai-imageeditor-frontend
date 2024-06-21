import React, { useRef } from "react";
import { Stack, Typography } from "@mui/material";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Button } from "@nextui-org/button";

import { MimeTypeFile } from "../types";
import { getImageUrlFromMimeTypeFile } from "../utils";

import ImageContainer from "./ImageContainer";
import ImageSkeletons from "./ImageSkeletons";

import { DownloadImageIcon } from "@/assets/icons/icons";

interface ResultsProps {
  isProcessing: boolean;
  files: MimeTypeFile[];
}

const Results = ({ isProcessing, files }: ResultsProps) => {
  const downloadAnchorRef = useRef<HTMLAnchorElement | null>(null);

  const handleDownloadAllFile = () => {
    for (const file of files) {
      const downloadUrl = getImageUrlFromMimeTypeFile(file);

      if (!downloadAnchorRef.current) return;
      // Create a URL for the Blob
      downloadAnchorRef.current.href = downloadUrl;
      downloadAnchorRef.current.download = file.name;
      // Trigger the download
      downloadAnchorRef.current.click();
      // Cleanup the URL after the download
      URL.revokeObjectURL(downloadUrl);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-1 h-full ">
      <ScrollShadow hideScrollBar className="flex-[5]">
        <Stack direction={"row"} flexWrap={"wrap"}>
          {files.map((f) => {
            return <ImageContainer key={f.name} file={f} type="results" />;
          })}
        </Stack>
      </ScrollShadow>

      {files.length > 1 && (
        <Stack direction={"row"} flex={1} justifyContent={"flex-end"}>
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */}
          <a ref={downloadAnchorRef} style={{ display: "none" }} />
          <Button endContent={<DownloadImageIcon className="w-[20px]" />} variant="shadow" onClick={handleDownloadAllFile}>
            Download all
          </Button>
        </Stack>
      )}
    </div>
  );
};

export default Results;
