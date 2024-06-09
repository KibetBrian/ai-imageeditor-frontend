'use client'
import React from "react";

import useImageUpload from "@/hooks/useImageUpload";

const ImageGeneration = () => {
  const { DropzoneArea } = useImageUpload({ multiple: false });

  return (
    <div>
      <DropzoneArea />
    </div>
  );
};

export default ImageGeneration;
