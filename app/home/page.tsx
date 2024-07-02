"use client";

import React from "react";
import { Stack, Typography } from "@mui/material";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import FeatureCard from "./_components/FeatureCard";
import { applicationFeatures } from "./constants";

import { GeneratePhotoIcon, SelectCanvasItemIcon } from "@/assets/icons/icons";

const Home = () => {
  const router = useRouter();

  return (
    <div className="pl-5">
      <Stack alignItems={"center"} justifyContent={"center"} spacing={5}>
        <Stack spacing={5} width={"80%"}>
          <Stack alignItems={"center"} direction={"row"} justifyContent={"space-between"} width={"90%"}>
            <Button color="primary" endContent={<GeneratePhotoIcon className="w-[20px]" />} radius="sm" variant="bordered" onClick={() => router.push("/image-generation")}>
              Generate Image
            </Button>
            <Button color="secondary" endContent={<SelectCanvasItemIcon className="w-[20px]" />} radius="sm" variant="bordered" onClick={() => router.push("editor")}>
              Edit Image
            </Button>
          </Stack>
          <div className="flex flex-wrap">
            {applicationFeatures.map((f, i) => (
              <FeatureCard key={f.title} feature={f} index={i} total={applicationFeatures.length} />
            ))}
          </div>
        </Stack>
        <Stack width={"80%"}>
          <Typography alignSelf={"start"}>Recents</Typography>
        </Stack>
      </Stack>
    </div>
  );
};

export default Home;
