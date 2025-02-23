"use client";
import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [erasingRemovesErasedObjects, setErasingRemovesErasedObjects] =
    useState(false);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current);

    setCanvas(fabricCanvas);
    initCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const initCanvas = (fabricCanvas) => {
    fabricCanvas.setOverlayColor("rgba(0,0,255,0.4)", undefined, {
      erasable: false,
    });
    const t = new fabric.Triangle({
      top: 300,
      left: 210,
      width: 100,
      height: 100,
      fill: "blue",
      erasable: false,
    });

    fabricCanvas.add(
      new fabric.Rect({
        top: 50,
        left: 100,
        width: 50,
        height: 50,
        fill: "#f55",
        opacity: 0.8,
      }),
      new fabric.Rect({
        top: 50,
        left: 150,
        width: 50,
        height: 50,
        fill: "#f55",
        opacity: 0.8,
      }),
      new fabric.Group(
        [
          t,
          new fabric.Circle({ top: 140, left: 230, radius: 75, fill: "green" }),
        ],
        { erasable: "deep" },
      ),
    );

    fabric.Image.fromURL(
      "https://ip.webmasterapi.com/api/imageproxy/http://fabricjs.com/assets/mononoke.jpg",
      (img) => {
        img.scaleToWidth(480);
        img.clone((clonedImg) => {
          fabricCanvas.add(
            clonedImg
              .set({
                left: 400,
                top: 350,
                clipPath: new fabric.Circle({
                  radius: 200,
                  originX: "center",
                  originY: "center",
                }),
                angle: 30,
              })
              .scale(0.25),
          );
          fabricCanvas.renderAll();
        });

        img.set({ opacity: 0.7 });
        function animate() {
          img.animate("opacity", img.get("opacity") === 0.7 ? 0.4 : 0.7, {
            duration: 1000,
            onChange: fabricCanvas.renderAll.bind(fabricCanvas),
            onComplete: animate,
          });
        }
        animate();
        fabricCanvas.setBackgroundImage(img);
        img.set({ erasable: false });

        fabricCanvas.on("erasing:end", ({ targets, drawables }) => {
          const output = document.getElementById("output");

          output.innerHTML = JSON.stringify(
            {
              objects: targets.map((t) => t.type),
              drawables: Object.keys(drawables),
            },
            null,
            "\t",
          );
          if (erasingRemovesErasedObjects) {
            targets.forEach(
              (obj) =>
                obj.group?.removeWithUpdate(obj) || fabricCanvas.remove(obj),
            );
          }
        });
        fabricCanvas.renderAll();
      },
      { crossOrigin: "anonymous" },
    );

    function animate() {
      try {
        fabricCanvas
          .item(0)
          .animate(
            "top",
            fabricCanvas.item(0).get("top") === 500 ? "100" : "500",
            {
              duration: 1000,
              onChange: fabricCanvas.renderAll.bind(fabricCanvas),
              onComplete: animate,
            },
          );
      } catch (error) {
        setTimeout(animate, 500);
      }
    }
    animate();
  };

  const changeAction = (target) => {
    ["select", "erase", "undo", "draw", "spray"].forEach((action) => {
      const t = document.getElementById(action);

      t.classList.remove("active");
    });

    if (typeof target === "string") target = document.getElementById(target);
    target.classList.add("active");
    switch (target.id) {
    case "select":
      canvas.isDrawingMode = false;
      break;
    case "erase":
      canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
      canvas.freeDrawingBrush.width = 10;
      canvas.isDrawingMode = true;
      break;
    case "undo":
      canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
      canvas.freeDrawingBrush.width = 10;
      canvas.freeDrawingBrush.inverted = true;
      canvas.isDrawingMode = true;
      break;
    case "draw":
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.width = 35;
      canvas.isDrawingMode = true;
      break;
    case "spray":
      canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
      canvas.freeDrawingBrush.width = 35;
      canvas.isDrawingMode = true;
      break;
    default:
      break;
    }
  };

  const setDrawableErasableProp = (drawable, value) => {
    canvas.get(drawable)?.set({ erasable: value });
    changeAction("erase");
  };

  const setBgImageErasableProp = (event) =>
    setDrawableErasableProp("backgroundImage", event.target.checked);

  const handleErasingRemovesErasedObjectsChange = (event) =>
    setErasingRemovesErasedObjects(event.target.checked);

  const downloadImage = () => {
    const ext = "png";
    const base64 = canvas.toDataURL({
      format: ext,
      enableRetinaScaling: true,
    });
    const link = document.createElement("a");

    link.href = base64;
    link.download = `eraser_example.${ext}`;
    link.click();
  };

  const downloadSVG = () => {
    const svg = canvas.toSVG();
    const a = document.createElement("a");
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const blobURL = URL.createObjectURL(blob);

    a.href = blobURL;
    a.download = "eraser_example.svg";
    a.click();
    URL.revokeObjectURL(blobURL);
  };

  const toJSON = async () => {
    const json = canvas.toDatalessJSON(["clipPath", "eraser"]);
    const out = JSON.stringify(json, null, "\t");
    const blob = new Blob([out], { type: "text/plain" });
    const clipboardItemData = { [blob.type]: blob };

    try {
      navigator.clipboard &&
        (await navigator.clipboard.write([
          new ClipboardItem(clipboardItemData),
        ]));
    } catch (error) {
      console.log(error);
    }
    const blobURL = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = blobURL;
    a.download = "eraser_example.json";
    a.click();
    URL.revokeObjectURL(blobURL);
  };

  return (
    <div>
      <canvas ref={canvasRef} height={600} id="c" width={800} />
      <div id="output" />
      <button id="select" onClick={() => changeAction("select")}>
        Select
      </button>
      <button id="erase" onClick={() => changeAction("erase")}>
        Erase
      </button>
      <button id="undo" onClick={() => changeAction("undo")}>
        Undo
      </button>
      <button id="draw" onClick={() => changeAction("draw")}>
        Draw
      </button>
      <button id="spray" onClick={() => changeAction("spray")}>
        Spray
      </button>
      <label>
        <input type="checkbox" onChange={setBgImageErasableProp} /> Background
        Image Erasable
      </label>
      <label>
        <input
          type="checkbox"
          onChange={handleErasingRemovesErasedObjectsChange}
        />{" "}
        Erasing Removes Erased Objects
      </label>
      <button onClick={downloadImage}>Download Image</button>
      <button onClick={downloadSVG}>Download SVG</button>
      <button onClick={toJSON}>Download JSON</button>
    </div>
  );
};

export default CanvasComponent;
