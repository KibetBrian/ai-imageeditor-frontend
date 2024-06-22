/* eslint-disable max-lines-per-function */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-magic-numbers */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Fade, Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import ReactCompareImage from "react-compare-image";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { commonColors } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";

import ImageWithBackground from "./assets/image_with_background.jpg";
import ImageWithoutBackground from "./assets/image_without_background.png";
import { getProcessedImages, removeBackgroundAPI } from "./api/api";
import ImageSkeletons from "./_components/ImageSkeletons";
import useBackgroundImageRemovalStore from "./state";
import ImageContainer from "./_components/ImageContainer";

import useHandleFetchError from "@/hooks/useHandleError";
import useImageUpload from "@/hooks/useImageUpload";
import { AddImageIcon, ProcessImageIcon } from "@/assets/icons/icons";

const BackgroundRemoval = () => {
  const handleFetchError = useHandleFetchError();

  const { DropzoneArea, files, handleRemoveFile, handleTriggerInput } = useImageUpload({ multiple: true });

  const { imagesBeingProcessed, setImagesBeingProcessed, removeImageBeingProcessed } = useBackgroundImageRemovalStore();

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

  const [skeletonProperties, setSkeletonProperties] = useState({
    skeletonsNumber: 0,
    isLoading: false,
  });

  useEffect(() => {
    if (isPosting) {
      setSkeletonProperties({
        skeletonsNumber: files.length,
        isLoading: true,
      });
    }

    if (imagesBeingProcessed.length > 0) {
      setSkeletonProperties({
        skeletonsNumber: imagesBeingProcessed.length,
        isLoading: true,
      });
    }

    if (!isPosting && imagesBeingProcessed.length === 0) {
      setSkeletonProperties({
        skeletonsNumber: 0,
        isLoading: false,
      });
    }
  }, [files.length, imagesBeingProcessed.length, isPosting]);

  return (
    <Fade in timeout={500}>
      <Stack height={"100%"} overflow={"hidden"} p={2} width={"100%"}>
        <Stack flex={1}>
          <Typography variant="h5">Image Background Removal</Typography>
        </Stack>
        <Stack direction={"row"} flex={10} height={"100%"}>
          <Stack flex={1} justifyContent={"center"}>
            <Stack sx={{ opacity: files.length > 0 ? 0 : 1, zIndex: files.length > 0 ? -1 : 1, position: files.length > 0 ? "absolute" : "relative" }}>
              <DropzoneArea />
            </Stack>

            {files.length > 0 && (
              <Fade in timeout={500}>
                <ScrollShadow hideScrollBar className="flex-[5]">
                  <Stack direction={"row"} flex={5} flexWrap={"wrap"} p={1}>
                    {files.map((f) => {
                      return <ImageContainer key={f.name} file={f} handleRemoveFile={handleRemoveFile} isProcessing={skeletonProperties.isLoading} type="upload" />;
                    })}
                  </Stack>
                </ScrollShadow>
              </Fade>
            )}

            {files.length > 0 && (
              <Stack className="w-full" flex={1}>
                <Fade in timeout={500}>
                  <div className=" w-full flex items-center justify-end">
                    <Stack direction={"row"} spacing={10}>
                      <Button
                        className="self-end"
                        disabled={skeletonProperties.isLoading}
                        endContent={<AddImageIcon className="w-[20px]" />}
                        radius="sm"
                        type="button"
                        variant="faded"
                        onClick={handleTriggerInput}
                      >
                        Add Image
                      </Button>
                      <Button
                        color="primary"
                        disabled={skeletonProperties.isLoading}
                        endContent={<ProcessImageIcon className="w-[20px]" />}
                        isLoading={skeletonProperties.isLoading}
                        radius="sm"
                        variant="solid"
                        onClick={() => mutate()}
                      >
                        Process
                      </Button>
                    </Stack>
                  </div>
                </Fade>
              </Stack>
            )}
          </Stack>
          <Stack flex={1} position={"relative"}>
            <Stack className="animate-spin-slow" direction={"row"} left={"50%"} position={"absolute"} top={"10%"}>
              <Stack>
                <Box bgcolor={commonColors.blue[600]} className="bg-gradient-to-t blur-[50px]" height={50} mb={"100px"} width={50} />
                <Box bgcolor={commonColors.blue[600]} className="bg-gradient-to-t blur-[50px]" height={50} width={50} />
              </Stack>
              <Stack alignItems={"center"} justifyContent={"center"}>
                <Box bgcolor={commonColors.blue[600]} className="bg-gradient-to-t blur-[50px]" height={50} ml={"100px"} width={50} />
              </Stack>
            </Stack>

            {(files.length > 0 || imagesBeingProcessed.length > 0) && (
              <Typography alignSelf={"center"} variant="subtitle2">
                Processed images will appear here
              </Typography>
            )}

            <Stack alignItems={"center"} direction={"row"} flexWrap={"wrap"} height={"100%"} justifyContent={"center"}>
              <ScrollShadow hideScrollBar className="h-[calc(100vh-80px)]">
                {skeletonProperties.isLoading && <ImageSkeletons imagesLength={skeletonProperties.skeletonsNumber} />}

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
                  <Stack height={"100%"} justifyContent={"center"} width={"100%"}>
                    <Stack height={400} width={600}>
                      <ReactCompareImage
                        skeleton
                        aspectRatio="taller"
                        leftImage={ImageWithBackground.src}
                        leftImageCss={{ borderRadius: "5px", height: "500px" }}
                        rightImage={ImageWithoutBackground.src}
                        rightImageCss={{ borderRadius: "5px", height: "500px" }}
                      />
                    </Stack>
                  </Stack>
                )}
              </ScrollShadow>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Fade>
  );
};

export default BackgroundRemoval;
