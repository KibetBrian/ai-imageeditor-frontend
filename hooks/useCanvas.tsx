"use client";
import { useEffect, useRef } from "react";
import { fabric } from "fabric";

interface UserCanvas {
  width: number;
  height: number;
}

const useCanvas = ({ height, width }: UserCanvas) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasInstanceRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvasInstanceRef.current = new fabric.Canvas(canvas, {
        width,
        height,
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
  }, [height, width]);

  const Canvas = () => {
    return <canvas ref={canvasRef} />;
  };

  return {
    canvasInstance: canvasInstanceRef.current,
    Canvas,
  };
};

export default useCanvas;
