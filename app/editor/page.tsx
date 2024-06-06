/* eslint-disable max-lines-per-function */
"use client";
import { fabric } from "fabric";
import React, { useEffect, useRef, useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Slider } from "@nextui-org/slider";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";

import { MenuControls, imageAddress } from "./constants";
import { MenuTitle } from "./types";
import { redoCanvasState, saveCanvasState, undoCanvasState } from "./data";

import { ApplyIcon, BackIcon, ForwardIcon } from "@/icons/icons";

const Editor = () => {
  const [selectedControl, setSelectedControl] = useState<MenuTitle>(
    MenuControls[0].title,
  );

  const [penProperties, setPenProperties] = useState({
    color: "#ffffff",
    width: 5,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasInstanceRef = useRef<fabric.Canvas | null>(null);

  const applicationLayoutTotalFlex = 7;
  const applicationFlex = 6;
  const editorTotalFlex = 5;
  const canvasFlex = 3;
  const canvasHeightPercentage = 0.7;

  useEffect(() => {
    if (canvasRef.current) {
      const editorWidth: number =
        (applicationFlex / applicationLayoutTotalFlex) * window.innerWidth;
      const canvasWidth: number = (canvasFlex / editorTotalFlex) * editorWidth;

      const canvasHeight = Number(window.innerHeight * canvasHeightPercentage);

      // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [canvasInstanceRef]);

  const handleClickMenuControl = (title: MenuTitle) => {
    setSelectedControl(title);

    if (title !== "Draw") {
      if (!canvasInstanceRef.current) return;

      canvasInstanceRef.current.isDrawingMode = false;
    }

    if (title === "Draw") {
      if (!canvasInstanceRef.current) return;

      const canvas = canvasInstanceRef.current;

      canvas.freeDrawingBrush.color = penProperties.color;
      canvas.freeDrawingBrush.width = penProperties.width;

      canvasInstanceRef.current.isDrawingMode = true;

      return;
    }

    if (title === "Erase") {
      if (!canvasInstanceRef.current) return;

      canvasInstanceRef.current.isDrawingMode = false;
    }

    if (title === "Image") {
      fabric.Image.fromURL(imageAddress, (img) => {
        canvasInstanceRef.current?.setBackgroundImage(img, () => {
          //Scale image to canvas size
          const scale =
            (window.innerHeight * canvasHeightPercentage) / img.width;

          img.scale(scale);
          canvasInstanceRef.current?.renderAll();
        });
      });
    }

    if (title === "Select") {
      if (!canvasInstanceRef.current) return;

      canvasInstanceRef.current.isDrawingMode = false;
    }
  };

  useEffect(() => {
    const canvas = canvasInstanceRef.current;

    if (!canvas) return;

    canvas.freeDrawingBrush.color = penProperties.color;
    canvas.freeDrawingBrush.width = penProperties.width;
  }, [penProperties]);

  // eslint-disable-next-line no-unused-vars
  const saveCanvas = (_e: any) => {
    const canvas = canvasInstanceRef.current;

    if (!canvas) return;

    saveCanvasState({ canvas });
  };

  canvasInstanceRef.current?.on("object:modified", saveCanvas);

  return (
    <div className="flex p-1">
      <div className="flex-1 flex flex-col items-center">
        <div className="flex flex-col">
          <Card aria-label="Options" className="space-y-4 p-2" radius="sm">
            {MenuControls.map((control) => (
              <Button
                key={control.title}
                endContent={control.icon}
                radius="sm"
                variant={selectedControl === control.title ? "solid" : "light"}
                onClick={() => handleClickMenuControl(control.title)}
              >
                {control.title}
              </Button>
            ))}
          </Card>
        </div>
      </div>
      <div
        className={`flex-[${canvasFlex}] flex flex-col gap-3 justify-center items-center`}
      >
        <div className="flex justify-between w-full items-center">
          <Button
            isIconOnly
            aria-label="Like"
            color="default"
            radius="sm"
            onClick={() =>
              undoCanvasState({ canvas: canvasInstanceRef.current })
            }
          >
            <BackIcon />
          </Button>

          <Card className="p-2 w-[300px]" radius="sm">
            <Slider
              className="max-w-md"
              defaultValue={1}
              label={selectedControl}
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
              onChange={(e) =>
                setPenProperties((p) => ({ ...p, width: e as number }))
              }
            />
          </Card>

          <Button
            isIconOnly
            aria-label="Like"
            color="default"
            radius="sm"
            onClick={() =>
              redoCanvasState({ canvas: canvasInstanceRef.current })
            }
          >
            <ForwardIcon />
          </Button>
        </div>
        <canvas ref={canvasRef} id="editor-canvas" />
        <Tabs aria-label="Options" radius="none">
          <Tab key="Sketch" title="Sketch" />
          <Tab
            key="Erase"
            title={
              <div className="flex items-center space-x-2">
                <span>Apply</span>
                <ApplyIcon className="w-[20px]" />
              </div>
            }
          />
        </Tabs>
      </div>
      <div className="flex-1">right</div>
    </div>
  );
};

export default Editor;
