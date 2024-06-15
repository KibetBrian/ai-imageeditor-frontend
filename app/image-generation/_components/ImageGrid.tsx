import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { useInView } from "react-intersection-observer";

import { Image as ImageObject } from "../types";

import CustomImage from "./Image";

interface ImageGrid {
  images: ImageObject[];
  numberofImagesToGenerate: number;
  fetchNextPage: () => void;
}

const ImageGrid = ({ images, numberofImagesToGenerate, fetchNextPage }: ImageGrid) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <Stack ref={ref} direction={"row"} flexWrap={"wrap"}>
      {images.map((d) => (
        <CustomImage key={d.url} img={d.url} numberOfImages={numberofImagesToGenerate} />
      ))}
    </Stack>
  );
};

export default ImageGrid;
