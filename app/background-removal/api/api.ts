import axios from "axios";
import { StatusCodes } from "http-status-codes";

import { appConfigs } from "@/config/app";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";

const supabase = createSupabaseBrowserClient();

interface RemoveBackgroundAPI {
  files: File[];
}

export interface RemoveBackgroundResponse {
  imageIds: string[];
  message: string;
}

export const removeBackgroundAPI = async ({ files }: RemoveBackgroundAPI): Promise<RemoveBackgroundResponse> => {
  const accessToken = (await supabase.auth.getSession()).data.session?.access_token;

  const formData = new FormData();

  files.forEach((f) => {
    formData.append("files", f);
  });

  const response = await axios({
    method: "post",
    url: `${appConfigs.backend}process/background-removal`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const isSuccess = response.status >= StatusCodes.OK && response.status < StatusCodes.MULTIPLE_CHOICES;

  if (!isSuccess) {
    throw new Error(response.data);
  }

  return response.data;
};

export interface ProcessedImage {
  status: "processing" | "processed" | "failed";
  imageId: string;
  base64Image: string;
  imageName: string;
}

interface GetProcessedImageResponse {
  images: ProcessedImage[];
  message: string;
}

interface GetProcessingImages {
  imageIds: string[];
}

export const getProcessedImages = async ({ imageIds }: GetProcessingImages): Promise<GetProcessedImageResponse> => {
  const accessToken = (await supabase.auth.getSession()).data.session?.access_token;

  const response = await axios({
    method: "post",
    url: `${appConfigs.backend}process/background-removal/processed`,
    data: { imageIds },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const isSuccess = response.status >= StatusCodes.OK && response.status < StatusCodes.MULTIPLE_CHOICES;

  if (!isSuccess) {
    throw new Error(response.data);
  }

  return response.data;
};
