/* eslint-disable no-magic-numbers */
import React from "react";
import { commonColors } from "@nextui-org/theme";

interface AspectRationProps {
  ratio: string; // '16:9'
}

const AspectRatio = ({ ratio }: AspectRationProps) => {
  const [width, height] = ratio.split(":").map(Number);

  const totalRatio = width + height;

  const maxWidth = 50;
  const maxHeight = 50;

  const containerWidth = (width * maxWidth) / totalRatio;

  const containerHeight = (height * maxHeight) / totalRatio;

  return (
    <div
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        backgroundColor: commonColors.zinc[900],
        border: `2px solid ${commonColors.zinc[500]}`,
        borderRadius: "2px",
      }}
    />
  );
};

export default AspectRatio;
