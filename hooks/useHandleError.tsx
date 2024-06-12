/* eslint-disable no-magic-numbers */
import { Typography } from "@mui/material";
import { Card } from "@nextui-org/card";
import React from "react";
import { commonColors } from "@nextui-org/theme";
import { toast } from "sonner";
import { AxiosError } from "axios";

export type ToastPosition =
  | "bottom-center"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "top-left"
  | "top-right";

interface HandleError {
  position?: ToastPosition;
  error: string | any | AxiosError;
}

const useHandleFetchError = () => {
  const renderToast = (message: string, position: ToastPosition) => {
    toast.custom(
      () => {
        return (
          <Card
            className="text-white p-4"
            radius="sm"
            // eslint-disable-next-line no-magic-numbers
            style={{ backgroundColor: commonColors.red[900] }}
          >
            <Typography variant="subtitle2">{message}</Typography>
          </Card>
        );
      },
      { position },
    );
  };

  const handleError = ({ position = "bottom-right", error }: HandleError) => {
    if (error instanceof AxiosError) {
      if (error.code === "ERR_NETWORK") {
        renderToast("Network error", position);
      }

      const message = error.response?.data.message;

      if (error.response?.status === 404) {
        renderToast("Resource not found", position);
      }

      if (error.response?.status === 500) {
        renderToast(message, position);
      }

      if (error.response?.status === 401) {
        renderToast(message, position);
      }

      if (error.response?.status === 403) {
        renderToast("Forbidden", position);
      }

      if (error.response?.status === 400) {
        renderToast("Bad request", position);
      }

      if (error.response?.status === 422) {
        renderToast(message, position);
      }

      if (error.response?.status === 409) {
        renderToast("Conflict", position);
      }
    }
  };

  return handleError;
};

export default useHandleFetchError;
