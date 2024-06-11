"use client";
import { Stack, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Slider } from "@nextui-org/slider";

import useImageUpload from "@/hooks/useImageUpload";

const Outpainting = () => {
  const { files, DropzoneArea } = useImageUpload({ multiple: false });

  const canvasWidth = 400;
  const canvasHeight = 400;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasInstanceRef = useRef<fabric.Canvas | null>(null);

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

  useEffect(() => {
    const canvasInstance = canvasInstanceRef.current;

    if (canvasInstance && files.length > 0) {
      fabric.Image.fromURL(URL.createObjectURL(files[0]), (img) => {
        const imageWidth = img.width!;
        const imageHeight = img.height!;

        const half = 0.5;

        const equalDivider = 2;

        const widthScaleFactor = canvasWidth / imageWidth;
        const heightScaleFactor = canvasHeight / imageHeight;
        const scaleFactor =
          Math.min(widthScaleFactor, heightScaleFactor) * half;

        const leftCenter =
          (canvasWidth - imageWidth * scaleFactor) / equalDivider;
        const topCenter =
          (canvasHeight - imageHeight * scaleFactor) / equalDivider;

        img.scale(scaleFactor);
        img.set({
          left: leftCenter,
          top: topCenter,
          selectable: false,
        });

        const rectangle = new fabric.Rect({
          left: leftCenter,
          top: topCenter,
          fill: "transparent",
          width: imageWidth * scaleFactor,
          height: imageHeight * scaleFactor,
          stroke: "white",
          strokeWidth: 2,
        });
        canvasInstance.add(img);
        canvasInstance.add(rectangle);
        canvasInstance.setActiveObject(rectangle);
        canvasInstance.renderAll();
      });
    }
  }, [files]);

  return (
    <Stack
      alignItems={"center"}
      height={"100%"}
      justifyContent={"center"}
      width={"100%"}
    >
      <Stack
        alignItems={"center"}
        height={"inherit"}
        spacing={2}
        width={"100%"}
      >
        <Stack alignItems={"start"} flex={1} width={"100%"}>
          <Typography variant="subtitle1">Outpaint Image</Typography>
        </Stack>
        {files.length === 0 && (
          <Stack
            alignItems={"center"}
            direction={"row"}
            height={"100%"}
            justifyContent={"center"}
            width={"100%"}
          >
            <Stack alignItems={"center"} flex={1} justifyContent={"center"}>
              <DropzoneArea />
            </Stack>
            <Stack alignItems={"center"} flex={1} justifyContent={"center"}>
              Illustration
            </Stack>
          </Stack>
        )}

        <Stack
          alignItems={"center"}
          direction={"row"}
          flex={10}
          height={"100%"}
          justifyContent={"center"}
          spacing={2}
          style={{ display: files.length > 0 ? "flex" : "none" }}
          width={"100%"}
        >
          <Stack flex={1} height={"100%"}>
            <Slider
              className="max-w-md"
              defaultValue={0.5}
              label="Creativity"
              maxValue={1}
              minValue={0}
              step={0.01}
            />
          </Stack>

          <Stack
            alignItems={"center"}
            flex={3}
            justifyContent={"space-between"}
            spacing={2}
            width={"100%"}
          >
            <canvas ref={canvasRef} />

            <Stack
              alignItems={"center"}
              direction={"row"}
              justifyContent={"space-between"}
              spacing={2}
              width={"100%"}
            >
              <Input
                description="Optional"
                endContent={<Button radius="sm">Outpaint</Button>}
                height={"80px"}
                label="Prompt"
                labelPlacement="outside"
                radius="sm"
                size="lg"
                variant="bordered"
              />
            </Stack>
          </Stack>

          <Stack flex={2} height={"100%"}>
            <Typography variant="subtitle2">
              Outpainted images will appear here
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Outpainting;
