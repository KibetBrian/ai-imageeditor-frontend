import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

import { getImageDimensions } from "../utils";

interface LoadingImageSkeletonProps {
  numberOfImages: number;
}

const LoadingImageSkeleton = ({
  numberOfImages,
}: LoadingImageSkeletonProps) => {
  return (
    <Skeleton className="rounded-lg mr-2 mb-2" isLoaded={false}>
      <Card
        className=""
        radius="sm"
        style={{
          width: `${getImageDimensions(numberOfImages).width}px`,
          height: `${getImageDimensions(numberOfImages).height}px`,
        }}
      />
    </Skeleton>
  );
};

export default LoadingImageSkeleton;
