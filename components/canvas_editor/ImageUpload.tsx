"use client";
import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Image from "next/image";

import { generateImage } from "@/apis/generate";
import { ImageUploadIcon } from "@/icons/icons";

const CanvasEditor = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { isPending, mutate } = useMutation({
    mutationFn: () => {
      return generateImage({ prompt: "A photo of a cat" });
    },
    onError: () => {
      toast.custom(
        () => {
          return (
            <Card>
              <CardHeader>Error</CardHeader>
            </Card>
          );
        },
        { position: "top-right" },
      );
    },
  });

  const handleUploadImage = (e: React.FormEvent) => {
    e.preventDefault();

    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.match("image.*")) {
      return;
    }

    setSelectedImage(file);

    setPreviewImageURL(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col gap-9">
      <Card className={"w-[800px] h-[600px]"}>
        <CardBody className="flex justify-center items-center h-full">
          {previewImageURL ? (
            <Image
              alt="Uploaded image"
              height={200}
              src={previewImageURL}
              width={200}
            />
          ) : (
            <div className="flex gap-6 flex-col">
              <h6>
                You have not selected upload a photo to start editing photo
              </h6>

              <Button
                endContent={<ImageUploadIcon />}
                type="submit"
                onClick={handleUploadImage}
              >
                Upload Image
              </Button>
              <input
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                type="file"
                onChange={handleFileChange}
              />
            </div>
          )}
        </CardBody>
      </Card>
      {!previewImageURL && (
        <Card className="flex flex-row gap-3 p-3">
          <Input min={3} placeholder="Enter prompt here" variant="flat" />
          <Button isLoading={isPending} onClick={() => mutate()}>
            {isPending ? "Generating..." : "Generate"}
          </Button>
        </Card>
      )}
    </div>
  );
};

export default CanvasEditor;
