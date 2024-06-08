import React from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { Stack } from "@mui/material";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Button } from "@nextui-org/button";

import { imageContainerDimensions } from "../constants";
import { MimeTypeFile } from "../types";

import ImageContainer from "./ImageContainer";

import { cn } from "@/utils/utils";
import { DownloadImageIcon } from "@/assets/icons/icons";

interface ResultsProps {
  filesLength: number;
  isProcessing: boolean;
  files: MimeTypeFile[];
}

const Results = ({ filesLength, isProcessing, files }: ResultsProps) => {
  const skeletons = [];

  const component = (
    <Skeleton
      className={cn(
        `rounded-lg mr-1 mb-1 w-[${imageContainerDimensions.width}px] h-[${imageContainerDimensions.height}px]`,
      )}
    >
      <div className="rounded-lg w-[200px] h-[200px] bg-default-300" />
    </Skeleton>
  );

  for (let i = 0; i < filesLength; i++) {
    skeletons.push(component);
  }

  return (
    <div className="flex-1 flex flex-col p-1 h-full ">
      {isProcessing && (
        <Stack direction={"row"} flex={1} flexWrap={"wrap"}>
          {...skeletons}
        </Stack>
      )}

      <ScrollShadow hideScrollBar className="flex-[5]">
        <Stack direction={"row"} flexWrap={"wrap"}>
          {files.map((f) => {
            return <ImageContainer key={f.name} file={f} type="results" />;
          })}
        </Stack>
      </ScrollShadow>

      {files.length > 1 && (
        <Stack direction={"row"} flex={1} justifyContent={"flex-end"}>
          <Button
            endContent={<DownloadImageIcon className="w-[20px]" />}
            variant="shadow"
          >
            Download all
          </Button>
        </Stack>
      )}
    </div>
  );
};

export default Results;
