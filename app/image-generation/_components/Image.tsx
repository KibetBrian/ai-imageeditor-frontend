import { Card } from "@nextui-org/card";
import React from "react";
import { Stack } from "@mui/material";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { useRouter } from "next/navigation";

import { getImageDimensions } from "../utils";

import { DownloadIcon, SelectCanvasItemIcon } from "@/assets/icons/icons";

interface ImageProp {
  img: string;
  numberOfImages: number;
}

const Image = ({ img, numberOfImages }: ImageProp) => {
  const router = useRouter();

  const [hovered, setHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      key={img}
      className="mr-2 mb-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card
        style={{
          width: `${getImageDimensions(numberOfImages).width}px`,
          height: `${getImageDimensions(numberOfImages).height}px`,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <Stack>
          <Stack
            alignItems={"end"}
            direction={"row"}
            justifyContent={"space-between"}
            style={{
              position: "absolute",
              zIndex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              color: "white",
              padding: "5px",
              bottom: 0,
              borderRadius: "5px",
              width: "100%",
              height: "50%",
              display: hovered ? "flex" : "none",
            }}
          >
            <Tooltip content="Edit image" size="sm">
              <Button
                isIconOnly
                endContent={
                  <SelectCanvasItemIcon className="w-[20px] h-[20px]" />
                }
                onClick={() => router.push("/editor")}
              />
            </Tooltip>
            <Tooltip content="Download image" size="sm">
              <Button
                isIconOnly
                endContent={<DownloadIcon className="w-[20px] h-[20px]" />}
              />
            </Tooltip>
          </Stack>
          <img
            alt="Generated"
            src={img}
            style={{
              objectFit: "contain",
              width: `${getImageDimensions(numberOfImages).width}px`,
              height: `${getImageDimensions(numberOfImages).height}px`,
              // eslint-disable-next-line no-magic-numbers
              scale: hovered ? 1.05 : 1,
              transition: "scale 0.5s",
            }}
          />
        </Stack>
      </Card>
    </div>
  );
};

export default Image;
