import React from "react";
import { Card } from "@nextui-org/card";

import { imageContainerDimensions } from "../constants";

import { cn } from "@/utils/utils";

interface ImageContainerProps {
  children: React.ReactNode;
}

const ImageContainer = ({ children }: ImageContainerProps) => {
  return (
    <Card
      isHoverable
      className={cn(`p-1  cursor-pointer space-y-1 mb-1 mr-1`)}
      style={{
        width: `${imageContainerDimensions.width}px`,
        height: `${imageContainerDimensions.height}px`,
      }}
    >
      {children}
    </Card>
  );
};

export default ImageContainer;
