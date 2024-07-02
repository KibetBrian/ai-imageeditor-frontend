/* eslint-disable max-lines-per-function */
"use client";
import { Stack, Typography } from "@mui/material";
import { commonColors } from "@nextui-org/theme";
import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { Slider } from "@nextui-org/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Card } from "@nextui-org/card";
import { HexColorPicker } from "react-colorful";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { useMutation } from "@tanstack/react-query";

import { objectRemovalPostApi } from "./api";
import { dataUrlToFile } from "./utils";

import { ApplyIcon, BackIcon, DownloadImageIcon, ForwardIcon, UploadImageIcon } from "@/assets/icons/icons";
import useStack from "@/hooks/useStack";
import useImageUpload from "@/hooks/useImageUpload";
import useHandleFetchError from "@/hooks/useHandleError";

const canvasWidth = 800;
const canvasHeight = 500;
const imagePaddingLeft = 0.1;
const imagePaddingTop = 0.05;

const defaultImageProperties = {
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  scaleFactor: 0,
};

const ImageObjectRemoval = () => {
  const handleFetchError = useHandleFetchError();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasInstanceRef = useRef<fabric.Canvas | null>(null);

  const { DropzoneArea, handleClickDropzoneContainer, files } = useImageUpload({ multiple: false });

  const { isRedoEmpty, peekUndo, pushToUndoStack, isUndoEmpty, popRedo, popUndo, clearStack, getUndoStackLength } = useStack();

  const [penProperties, setPenProperties] = useState({
    color: "#ffffff",
    width: 5,
  });

  useEffect(() => {
    const canvas = canvasInstanceRef.current;

    if (canvas) {
      canvas.freeDrawingBrush.color = penProperties.color;
      canvas.freeDrawingBrush.width = penProperties.width;
    }
  }, [penProperties]);

  const [imageProperties, setImageProperties] = useState(defaultImageProperties);

  useEffect(() => {
    if (files.length > 0 && canvasInstanceRef.current) {
      // Remove exiting background
      canvasInstanceRef.current?.clear();
      canvasInstanceRef.current.backgroundColor = "#18181B";

      const url = URL.createObjectURL(files[0]);

      fabric.Image.fromURL(url, (img) => {
        pushToUndoStack(url);

        const widthScaleFactor = canvasWidth / img.width!;
        const heightScaleFactor = canvasHeight / img.height!;

        const scaleFactor = Math.min(widthScaleFactor, heightScaleFactor);

        const left = (canvasWidth - img.width! * scaleFactor) / 2;
        const top = (canvasHeight - img.height! * scaleFactor) / 2;

        img.scale(scaleFactor);
        img.set({
          left,
          top,
        });

        setImageProperties({
          width: img.getScaledWidth(),
          height: img.getScaledHeight(),
          scaleFactor,
          left,
          top,
        });

        canvasInstanceRef.current?.add(img);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files[0]]);

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

      canvasInstanceRef.current.freeDrawingBrush.color = penProperties.color;
      canvasInstanceRef.current.freeDrawingBrush.width = penProperties.width;
    }

    return () => {
      canvasInstanceRef.current?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!imageProperties.height) return;

    const canvas = canvasInstanceRef.current;

    if (canvas) {
      fabric.Image.fromURL(peekUndo(), (img) => {
        const { left, top } = imageProperties;

        const widthScaleFactor = canvasWidth / img.width!;
        const heightScaleFactor = canvasHeight / img.height!;

        const scaleFactor = Math.min(widthScaleFactor, heightScaleFactor);

        img.scale(scaleFactor);
        img.set({
          left,
          top,
        });
        canvas.renderOnAddRemove = false;
        canvas.clear();
        canvas.backgroundColor = "#18181B";
        canvas.add(img);
        canvas.renderAll();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peekUndo()]);

  const getCanvasImageFile = () => {
    if (!canvasInstanceRef.current) return;

    const dataUrl = canvasInstanceRef.current?.toDataURL({
      format: "png",
      ...imageProperties,
      quality: 1,
    });

    if (dataUrl) {
      return dataUrlToFile({ dataUrl, filename: "mask.png" });
    }
  };
  const handleSuccess = (data: { message: string; image: string }) => {
    const url = `data:image/png;base64,${data.image}`;

    pushToUndoStack(url);

    canvasInstanceRef.current?.clear();

    fabric.Image.fromURL(url, (img) => {
      img.left = canvasWidth * imagePaddingLeft;
      img.top = canvasHeight * imagePaddingTop;

      img.set({
        left: (canvasWidth - img.getScaledWidth()) / 2,
        top: (canvasHeight - img.getScaledHeight()) / 2,
      });

      canvasInstanceRef.current?.add(img);
      canvasInstanceRef.current?.renderAll();
    });
  };

  const handleDownloadImage = () => {
    const dataUrl = canvasInstanceRef.current?.toDataURL({
      format: "png",
      ...imageProperties,
      quality: 1,
      width: imageProperties.width,
      height: imageProperties.height,
    });

    if (dataUrl) {
      const a = document.createElement("a");

      a.href = dataUrl;
      a.download = files[0]?.name || "image.png";
      a.click();
    }
  };

  const { mutate, status } = useMutation({
    mutationFn: async () => objectRemovalPostApi({ image: files[0], mask: getCanvasImageFile()! }),
    onError: (e) => handleFetchError({ error: e }),
    onSuccess: handleSuccess,
  });

  return (
    <Stack height={"100%"} spacing={5}>
      {files.length === 0 && (
        <Stack>
          <Typography fontSize={"20px"} variant="subtitle1">
            Image Object Removal
          </Typography>
          <Typography color={commonColors.zinc[400]} variant="caption">
            Shade part of the image you want to remove
          </Typography>
        </Stack>
      )}

      {files.length === 0 && (
        <Stack direction={"row"} height={"100%"}>
          <Stack alignItems={"center"} flex={1} justifyContent={"center"}>
            <DropzoneArea />
          </Stack>
          <Stack flex={1}>Results illustration</Stack>
        </Stack>
      )}

      <Stack alignItems={"center"} display={files.length === 0 ? "none" : "flex"} height={"100%"} justifyContent={"center"} width={"100%"}>
        <Stack flex={10} spacing={2}>
          <Stack alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
            <Tooltip content="Undo">
              <Button
                isIconOnly
                aria-label="Like"
                color={isUndoEmpty() ? "default" : "primary"}
                disableRipple={isUndoEmpty()}
                disabled={isUndoEmpty()}
                radius="sm"
                size="sm"
                onClick={() => popUndo()}
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
                    <Card className="w-[20px] h-[20px] " radius="sm" style={{ backgroundColor: penProperties.color }} />
                  </PopoverTrigger>
                  <PopoverContent>
                    <HexColorPicker color={penProperties.color} onChange={(e) => setPenProperties((p) => ({ ...p, color: e }))} />
                  </PopoverContent>
                </Popover>
              }
              step={1}
              value={penProperties.width}
              onChange={(e) => setPenProperties((p) => ({ ...p, width: e as number }))}
            />
            <Tooltip content="Redo">
              <Button
                isIconOnly
                aria-label="Like"
                color={isRedoEmpty() ? "default" : "primary"}
                disableRipple={isRedoEmpty()}
                disabled={isRedoEmpty()}
                radius="sm"
                size="sm"
                onClick={() => popRedo()}
              >
                <ForwardIcon />
              </Button>
            </Tooltip>
          </Stack>
          <canvas ref={canvasRef} />
          <Stack alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
            <Button
              endContent={<UploadImageIcon className="w-[20px]" />}
              radius="sm"
              onClick={() => {
                clearStack();
                handleClickDropzoneContainer();
              }}
            >
              Change Image
            </Button>
            <Stack direction={"row"} spacing={2}>
              <Button endContent={<ApplyIcon className="w-[20px]" />} isLoading={status === "pending"} radius="sm" onClick={() => mutate()}>
                Apply
              </Button>
              {getUndoStackLength() > 1 && (
                <Button endContent={<DownloadImageIcon className="w-[20px]" />} onClick={handleDownloadImage}>
                  Download
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ImageObjectRemoval;
