import React from "react";
import { Typography } from "@mui/material";
import { Card } from "@nextui-org/card";
import { commonColors } from "@nextui-org/theme";
import { toast } from "sonner";

import { ToastPosition } from "./useHandleError";

interface HandleFetchSuccess {
  message: string;
  position?: ToastPosition;
}

const useHandleFetchSuccess = ({ message, position }: HandleFetchSuccess) => {
  const handleSuccess = () => {
    toast.custom(
      () => {
        return (
          <Card
            className="text-white p-4"
            radius="sm"
            // eslint-disable-next-line no-magic-numbers
            style={{ backgroundColor: commonColors.green[900] }}
          >
            <Typography>{message}</Typography>
          </Card>
        );
      },
      { position },
    );
  };

  return handleSuccess;
};

export default useHandleFetchSuccess;
