import axios from "axios";
import { StatusCodes } from "http-status-codes";

import { appConfigs } from "@/config/app";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";

interface GenerateImagePostAPIPayload {
  numberOfImages: number;
  aspectRatio: string;
  negativePrompt: string;
  prompt: string;
  seed: number;
  model: string;
}
export const generateImagePostApi = async (payload: GenerateImagePostAPIPayload) => {
  const supabase = createSupabaseBrowserClient();

  const accessToken = (await supabase.auth.getSession()).data.session?.access_token;

  const results = await axios.post(`${appConfigs.backend}generate/image`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const isSuccess = results.status >= StatusCodes.OK && results.status < StatusCodes.MULTIPLE_CHOICES;

  if (!isSuccess) {
    throw results.data;
  }

  return results.data;
};
