import { Stack } from "@mui/material";
import React from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { Card } from "@nextui-org/card";

const loading = () => {
  return (
    <Stack alignItems={"end"} direction={"row"} height={"calc(100vh - 64px)"} spacing={2}>
      <Stack flex={2}>
        <Card radius="sm">
          <Skeleton className="rounded-lg">
            <div className="h-[200px] rounded-lg bg-default-300" />
          </Skeleton>
        </Card>
      </Stack>
      <Stack flex={10}>
        <Stack alignSelf={"center"} direction={"row"} flexWrap={"wrap"} width={"80%"}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="h-[200px] mr-2 mb-2 w-[230px]" radius="sm">
              <Skeleton className="rounded-lg">
                <div className="h-[200px] w-[230px] rounded-lg bg-default-300" />
              </Skeleton>
            </Card>
          ))}
        </Stack>
        <Card radius="sm">
          <Skeleton className="rounded-lg">
            <div className="h-[100px] rounded-lg bg-default-300" />
          </Skeleton>
        </Card>
      </Stack>
      <Stack flex={2}>
        <Card radius="sm">
          <Skeleton className="rounded-lg">
            <div className="h-[200px] rounded-lg bg-default-300" />
          </Skeleton>
        </Card>
      </Stack>
    </Stack>
  );
};

export default loading;
