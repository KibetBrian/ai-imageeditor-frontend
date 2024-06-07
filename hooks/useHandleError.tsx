import { Typography } from "@mui/material";
import { Card } from "@nextui-org/card";
import React from "react";
import { commonColors } from "@nextui-org/theme";
import { toast } from "sonner";

interface HandleError {
  position?:
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "top-left"
    | "top-right";
  error: string | any;
}

const useHandleFetchError = () => {
  const handleError = ({ position = "bottom-right", error }: HandleError) => {
    toast.custom(
      () => {
        return (
          <Card
            className="text-white p-4"
            radius="sm"
            // eslint-disable-next-line no-magic-numbers
            style={{ backgroundColor: commonColors.red[900] }}
          >
            <Typography>
              {typeof error === "string" ? error : error?.message}
            </Typography>
          </Card>
        );
      },
      { position },
    );
  };

  return handleError;
};

export default useHandleFetchError;
