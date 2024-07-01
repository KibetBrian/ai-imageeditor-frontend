import { Box, Fade, Stack } from "@mui/material";
import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

const loading = () => {
  return (
    <Fade in timeout={500}>
      <Stack height={"100%"} spacing={10}>
        <Skeleton className="w-2/5 rounded-sm">
          <div className="h-8 w-2/5 bg-default-300" />
        </Skeleton>

        <Stack alignItems={"center"} direction={"row"} height={"50vh"} spacing={4}>
          <Skeleton className="rounded-sm h-[100%]">
            <Box
              sx={{
                width: "35vw",
              }}
            />
          </Skeleton>
          <Skeleton className="rounded-sm h-[100%]">
            <Box
              sx={{
                width: "35vw",
              }}
            />
          </Skeleton>
        </Stack>
      </Stack>
    </Fade>
  );
};

export default loading;
