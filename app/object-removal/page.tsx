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
import { useMutation } from "@tanstack/react-query";

import { dataUrlToFile } from "./utils";

import useImageUpload from "@/hooks/useImageUpload";
import {
  ApplyIcon,
  BackIcon,
  DownloadImageIcon,
  ForwardIcon,
  UploadImageIcon,
} from "@/assets/icons/icons";
import useHandleFetchError from "@/hooks/useHandleError";
import { appConfigs } from "@/config/app";
import useStack from "@/hooks/useStack";

const ObjectRemoval = () => {
  const handleFetchError = useHandleFetchError();

  const {
    isRedoEmpty,
    peekUndo,
    pushToUndoStack,
    isUndoEmpty,
    popRedo,
    popUndo,
    clearStack,
  } = useStack();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasInstanceRef = useRef<fabric.Canvas | null>(null);

  const [penProperties, setPenProperties] = useState({
    color: "#ffffff",
    width: 5,
  });

  const defaultImageProperties = {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    scaleFactor: 0,
  };

  const [imageProperties, setImageProperties] = useState(
    defaultImageProperties,
  );

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

      const url = URL.createObjectURL(selectedImage);

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
  }, [selectedImage]);

  useEffect(() => {
    const canvas = canvasInstanceRef.current;

    if (canvas) {
      canvas.freeDrawingBrush.color = penProperties.color;
      canvas.freeDrawingBrush.width = penProperties.width;
    }
  }, [penProperties]);

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
        canvas.add(img);
        canvas.renderAll();
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peekUndo()]);

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

  const { mutate, status } = useMutation({
    mutationFn: async () => {
      const dataUrl = canvasInstanceRef.current?.toDataURL({
        format: "png",
        ...imageProperties,
        quality: 1,
      });

      if (!dataUrl) throw new Error("error processing image");

      const formData = new FormData();

      formData.append(
        "files",
        dataUrlToFile({ dataUrl, filename: "mask.png" }),
      );

      formData.append("files", selectedImage as File);

      const response = await fetch(
        `${appConfigs.backend}process/object-removal`,
        {
          method: "POST",
          body: formData,
        },
      );

      const responseData = await response.json();

      const isSuccess = response.status >= 200 && response.status < 300;

      if (!isSuccess) throw new Error(responseData.message);

      return responseData;
    },
    onError: (e) => handleFetchError({ error: e }),
    onSuccess: handleSuccess,
  });

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

          <Stack
            alignItems={"center"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Button
              endContent={<UploadImageIcon className="w-[20px]" />}
              onClick={() => {
                clearStack();
                handleClickDropzoneContainer();
              }}
            >
              Change Image
            </Button>
            <Stack direction={"row"} spacing={2}>
              <Button
                endContent={<ApplyIcon className="w-[20px]" />}
                isLoading={status === "pending"}
                onClick={() => mutate()}
              >
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
