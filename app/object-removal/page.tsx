/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
"use client";
import { Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Slider } from "@nextui-org/slider";
import { HexColorPicker } from "react-colorful";
import { Card } from "@nextui-org/card";
import { Tooltip } from "@nextui-org/tooltip";

import useImageUpload from "@/hooks/useImageUpload";
import {
  ApplyIcon,
  BackIcon,
  DownloadImageIcon,
  ForwardIcon,
  UploadImageIcon,
} from "@/assets/icons/icons";

const ObjectRemoval = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasInstanceRef = useRef<fabric.Canvas | null>(null);

  const [penProperties, setPenProperties] = useState({
    color: "#ffffff",
    width: 5,
  });

  const [imageProperties, setImageProperties] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  const canvasWidth = 800;
  const canvasHeight = 500;
  const imagePaddingLeft = 0.1;
  const imagePaddingTop = 0.05;

  const { DropzoneArea, handleClickDropzoneContainer, files } = useImageUpload({
    multiple: false,
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (files.length > 0) {
      setSelectedImage(files[0]);
    }
  }, [files]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasInstanceRef.current = new fabric.Canvas(canvasRef.current, {
        width: canvasWidth,
        height: canvasHeight,
        backgroundColor: "#18181B",
        isDrawingMode: true,
        selection: false,
        centeredScaling: true,
        freeDrawingCursor: "pen",
      });
    }

    return () => {
      canvasInstanceRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (selectedImage && canvasInstanceRef.current) {
      // Remove exiting background
      canvasInstanceRef.current?.clear();
      canvasInstanceRef.current.backgroundColor = "#18181B";

      fabric.Image.fromURL(URL.createObjectURL(selectedImage), (img) => {
        const widthScaleFactor = canvasWidth / img.width!;
        const heightScaleFactor = canvasHeight / img.height!;

        const scaleFactor = Math.min(widthScaleFactor, heightScaleFactor);

        img.left = canvasWidth * imagePaddingLeft;
        img.top = canvasHeight * imagePaddingTop;

        img.scale(scaleFactor);
        img.set({
          left: (canvasWidth - img.getScaledWidth()) / 2,
          top: (canvasHeight - img.getScaledHeight()) / 2,
        });

        setImageProperties({
          width: img.getScaledWidth(),
          height: img.getScaledHeight(),
          left: img.left!,
          top: img.top!,
        });

        canvasInstanceRef.current?.add(img);
      });
    }
  }, [selectedImage]);

  useEffect(() => {
    if (canvasInstanceRef.current) {
      canvasInstanceRef.current.freeDrawingBrush.color = penProperties.color;
      canvasInstanceRef.current.freeDrawingBrush.width = penProperties.width;
    }
  }, [penProperties]);

  const handleDownloadImage = () => {
    const dataUrl = canvasInstanceRef.current?.toDataURL({
      format: "png",
      ...imageProperties,
      quality: 1,
    });

    if (dataUrl) {
      const a = document.createElement("a");

      a.href = dataUrl;
      a.download = selectedImage?.name || "image.png";
      a.click();
    }
  };

  return (
    <Stack height={"100%"}>
      <Stack alignItems={"center"} flex={10} height={"100%"}>
        <Stack display={selectedImage ? "block" : "none"} spacing={1}>
          <Stack
            alignItems={"center"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Tooltip content="Undo">
              <Button
                isIconOnly
                aria-label="Like"
                color="default"
                radius="sm"
                size="sm"
              >
                <BackIcon />
              </Button>
            </Tooltip>

            <Slider
              className="max-w-md"
              label={"Brush size"}
              maxValue={100}
              minValue={1}
              size="sm"
              startContent={
                <Popover placement="bottom" showArrow={true}>
                  <PopoverTrigger>
                    <Card
                      className="w-[20px] h-[20px] "
                      radius="sm"
                      style={{ backgroundColor: penProperties.color }}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <HexColorPicker
                      color={penProperties.color}
                      onChange={(e) =>
                        setPenProperties((p) => ({ ...p, color: e }))
                      }
                    />
                  </PopoverContent>
                </Popover>
              }
              step={1}
              value={penProperties.width}
              onChange={(e) =>
                setPenProperties((p) => ({ ...p, width: e as number }))
              }
            />
            <Tooltip content="Redo">
              <Button
                isIconOnly
                aria-label="Like"
                color="default"
                radius="sm"
                size="sm"
              >
                <ForwardIcon />
              </Button>
            </Tooltip>
          </Stack>
          <canvas ref={canvasRef} />

          <Stack
            alignItems={"center"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Button
              endContent={<UploadImageIcon className="w-[20px]" />}
              onClick={() => {
                handleClickDropzoneContainer();
              }}
            >
              Change Image
            </Button>
            <Stack direction={"row"} spacing={2}>
              <Button endContent={<ApplyIcon className="w-[20px]" />}>
                Apply
              </Button>
              <Button
                endContent={<DownloadImageIcon className="w-[20px]" />}
                onClick={handleDownloadImage}
              >
                Download
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          alignItems={"center"}
          height={"100%"}
          style={{ display: selectedImage ? "none" : "flex" }}
          width={"100%"}
        >
          <DropzoneArea />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ObjectRemoval;
