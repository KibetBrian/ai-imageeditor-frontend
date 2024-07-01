import { appConfigs } from "@/config/app";

interface RemoveObjectPostApi {
  mask: File;
  image: File;
}

export const objectRemovalPostApi = async ({ image, mask }: RemoveObjectPostApi) => {
  const formData = new FormData();

  formData.append("files", mask);

  formData.append("files", image);

  const response = await fetch(`${appConfigs.backend}process/object-removal`, {
    method: "POST",
    body: formData,
  });

  const responseData = await response.json();

  const isSuccess = response.status >= 200 && response.status < 300;

  if (!isSuccess) throw new Error(responseData.message);

  return responseData;
};
