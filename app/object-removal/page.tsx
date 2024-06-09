"use client";
import { Stack, Typography } from "@mui/material";
import { Divider } from "@nextui-org/divider";
import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

import useImageUpload from "@/hooks/useImageUpload";

const ObjectRemoval = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasInstanceRef = useRef<fabric.Canvas | null>(null);

  const canvasWidth = 600;
  const canvasHeight = 500;

  const { DropzoneArea, files } = useImageUpload({ multiple: false });

  const selectedImage = files[0];

  useEffect(() => {
    if (canvasRef.current) {
      canvasInstanceRef.current = new fabric.Canvas(canvasRef.current, {
        width: canvasWidth,
        height: canvasHeight,
        backgroundColor: "#18181B",
        isDrawingMode: false,
        selection: true,
        centeredScaling: true,
        freeDrawingCursor: "pen",
      });
    }

    return () => {
      canvasInstanceRef.current?.dispose();
    };
  }, []);

  return (
    <Stack height={"100%"}>
      <Stack flex={1} spacing={1}>
        <Typography variant="subtitle1">Object Removal</Typography>
        <Divider />
      </Stack>

      <Stack alignItems={"center"} flex={5} height={"100%"}>
        <Stack display={selectedImage ? "block" : "none"}>
          <canvas ref={canvasRef} />
        </Stack>

        {!selectedImage && (
          <Stack alignItems={"center"} height={"100%"} width={"100%"}>
            <DropzoneArea />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default ObjectRemoval;
