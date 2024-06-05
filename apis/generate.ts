import axios from "axios";

import { appConfigs } from "@/config/app";

const baseUrl = appConfigs.backend;

interface GenerateImage {
  prompt: string;
}

export const generateImage = (data: GenerateImage) => {
  return axios({
    method: "post",
    url: `${baseUrl}/generate`,
    data,
  });
};
