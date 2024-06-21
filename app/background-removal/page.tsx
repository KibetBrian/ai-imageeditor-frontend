"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { Fade, Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import ReactCompareImage from "react-compare-image";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import ImageWithBackground from "./assets/image_with_background.jpg";
import ImageWithoutBackground from "./assets/image_without_background.png";
import Upload from "./_components/Upload";
import { getProcessedImages, removeBackgroundAPI } from "./api/api";
import useFileUploadValidation from "./hooks/useFileValidation";
import ImageSkeletons from "./_components/ImageSkeletons";
import useBackgroundImageRemovalStore from "./state";

import useHandleFetchError from "@/hooks/useHandleError";

const BackgroundRemoval = () => {
  const handleFetchError = useHandleFetchError();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { validate, files, removeFile } = useFileUploadValidation();

  const { imagesBeingProcessed, setImagesBeingProcessed, removeImageBeingProcessed } = useBackgroundImageRemovalStore();

  const handleTriggerInput = () => {
    fileInputRef.current?.click();
  };

  const { mutate, isPending: isPosting } = useMutation({
    mutationFn: () => removeBackgroundAPI({ files }),

    onSuccess: (data) => {
      if (imagesBeingProcessed.length > 0) {
        setImagesBeingProcessed([...data.imageIds, ...imagesBeingProcessed]);

        return;
      }

      setImagesBeingProcessed(data.imageIds);
    },

    onError: (e) => handleFetchError({ error: e }),
  });

  const { data: processedImagesData } = useQuery({
    queryKey: ["getProcessedImage", imagesBeingProcessed],
    queryFn: () => getProcessedImages({ imageIds: imagesBeingProcessed }),
    refetchInterval: 1000,
    staleTime: 1000,
    enabled: imagesBeingProcessed.length > 0,
  });

  const processedImages = useMemo(() => {
    return processedImagesData?.images ?? [];
  }, [processedImagesData]);

  useEffect(() => {
    if (processedImages) {
      for (const image of processedImages) {
        if (image.status !== "processing") {
          removeImageBeingProcessed(image.imageId);
        }
      }
    }
  }, [processedImages, processedImagesData, removeImageBeingProcessed]);

  return (
    <Fade in timeout={500}>
      <div className="h-full w-full p-2 overflow-hidden">
        <div>
          <Typography variant="h5">Image Background Removal</Typography>
        </div>
        <Stack direction={"row"} height={"100%"}>
          <Stack flex={1} height={"100%"} justifyContent={"space-around"}>
            <div className="flex flex-col h-full" style={{ justifyContent: files.length > 0 ? "start" : "center" }}>
              <Upload
                fileInputRef={fileInputRef}
                files={files}
                handleProcess={mutate}
                handleRemoveFile={removeFile}
                handleTriggerInput={handleTriggerInput}
                isProcessing={isPosting}
                processTitle="Remove background"
                processingTitle="Removing background..."
                onDrop={validate}
              />
            </div>
          </Stack>
          <Stack flex={1}>
            {(files.length > 0 || imagesBeingProcessed.length > 0) && <Typography alignSelf={"center"}>Processed images will appear here</Typography>}

            <Stack alignItems={"center"} direction={"row"} flexWrap={"wrap"} height={"100%"} justifyContent={"center"}>
              <ScrollShadow hideScrollBar className="h-[calc(100vh-64px)]">
                {isPosting && <ImageSkeletons imagesLength={files.length} />}

                {imagesBeingProcessed.length > 0 && <ImageSkeletons imagesLength={imagesBeingProcessed.length} />}

                {processedImages.length > 0 && (
                  <Stack direction={"row"} flexWrap={"wrap"}>
                    {processedImages.map((i) => {
                      if (i.status === "failed") {
                        return <Typography key={i.imageId}>Failed to process image</Typography>;
                      }

                      return <Stack key={i.imageId}>Image</Stack>;
                    })}
                  </Stack>
                )}
                {files.length === 0 && imagesBeingProcessed.length === 0 && (
                  <Stack height={"100%"} justifyContent={"center"}>
                    <Stack width={500}>
                      <ReactCompareImage
                        skeleton
                        aspectRatio="taller"
                        leftImage={ImageWithBackground.src}
                        leftImageCss={{ borderRadius: "10px" }}
                        rightImage={ImageWithoutBackground.src}
                        rightImageCss={{ borderRadius: "10px" }}
                      />
                    </Stack>
                  </Stack>
                )}
              </ScrollShadow>
            </Stack>
          </Stack>
        </Stack>
      </div>
    </Fade>
  );
};

export default BackgroundRemoval;
