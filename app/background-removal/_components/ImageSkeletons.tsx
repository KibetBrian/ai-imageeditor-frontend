import { Stack } from "@mui/material";
import React from "react";

import ImageSkeleton from "./ImageSkeleton";

interface ImageSkeletonsProps {
  imagesLength: number;
}

const ImageSkeletons = ({ imagesLength }: ImageSkeletonsProps) => {
  const skeletons = [];

  for (let i = 0; i < imagesLength; i++) {
    skeletons.push(<ImageSkeleton />);
  }

  return (
    <Stack direction={"row"} flex={1} flexWrap={"wrap"}>
      {...skeletons}
    </Stack>
  );
};

export default ImageSkeletons;
