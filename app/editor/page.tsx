"use client";
import { fabric } from "fabric";
import React, { useEffect, useRef, useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";

import { MenuControls, imageAddress } from "./constants";
import { MenuTitle } from "./types";

import { ApplyIcon } from "@/icons/icons";

const Editor = () => {
  const [isDrawing, setIsDrawing] = useState(false);

  const canvaControls = [];

  const [selectedControl, setSelectedControl] = useState<MenuTitle>(
    MenuControls[0].title,
  );
  const [savedObjects, setSavedObjects] = useState<fabric.Object[]>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasInstanceRef = useRef<fabric.Canvas | null>(null);

  const applicationLayoutTotalFlex = 7;
  const applicationFlex = 6;
  const editorTotalFlex = 5;
  const canvasFlex = 3;

  useEffect(() => {
    if (canvasRef.current) {
      const editorWidth: number =
        (applicationFlex / applicationLayoutTotalFlex) * window.innerWidth;
      const canvasWidth: number = (canvasFlex / editorTotalFlex) * editorWidth;

      const canvasHeightPercentage = 0.7;
      const canvasHeight = Number(window.innerHeight * canvasHeightPercentage);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      canvasInstanceRef.current = new fabric.Canvas(canvasRef.current, {
        width: canvasWidth,
        height: canvasHeight,
        backgroundColor: "#18181B",
        isDrawingMode: false,
        selection: true,
        centeredScaling: true,
      });
    }

    return () => {
      canvasInstanceRef.current?.dispose();
    };
  }, [canvasInstanceRef]);

  canvasInstanceRef.current?.on("mouse:down", (e) => {
    console.log("mouse down");
  });

  useEffect(() => {
    if (canvasInstanceRef.current) {
      canvasInstanceRef.current.isDrawingMode = isDrawing;
    }
  }, [isDrawing]);

  const addRectange = () => {
    if (!canvasInstanceRef.current) return;

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 20,
      height: 20,
    });

    canvasInstanceRef.current.add(rect);
  };

  const handleClickMenuControl = (title: MenuTitle) => {
    setSelectedControl(title);

    if (title !== "Draw") {
      if (!canvasInstanceRef.current) return;

      canvasInstanceRef.current.isDrawingMode = false;
    }

    if (title === "Draw") {
      if (!canvasInstanceRef.current) return;

      canvasInstanceRef.current.isDrawingMode = true;

      return;
    }

    if (title === "Erase") {
      if (!canvasInstanceRef.current) return;

      canvasInstanceRef.current.isDrawingMode = false;
    }

    if (title === "Image") {
      fabric.Image.fromURL(imageAddress, (img) => {
        canvasInstanceRef.current?.add(img);
      });
    }

    if (title === "Select") {
      if (!canvasInstanceRef.current) return;

      canvasInstanceRef.current.isDrawingMode = false;
    }
  };

  return (
    <div className="flex p-1">
      <div className="flex-1 flex flex-col items-center">
        <div className="flex flex-col">
          <Card aria-label="Options" className="space-y-4 p-2" radius="sm">
            {MenuControls.map((control) => (
              <Button
                key={control.title}
                endContent={control.icon}
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
