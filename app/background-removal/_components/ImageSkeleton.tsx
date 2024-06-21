import React from "react";
import { Skeleton } from "@nextui-org/skeleton";

import { imageContainerDimensions } from "../constants";

const ImageSkeleton = () => {
  return (
    <Skeleton
      className={`rounded-lg mr-1 mb-1`}
      style={{
        width: `${imageContainerDimensions.width}px`,
        height: `${imageContainerDimensions.height}px`,
      }}
    >
      <div className="rounded-lg w-[200px] h-[200px] bg-default-300" />
    </Skeleton>
  );
};

export default ImageSkeleton;
