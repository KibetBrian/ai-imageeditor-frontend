"use client";

import React from "react";
import { Stack, Typography } from "@mui/material";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import FeatureCard from "./_components/FeatureCard";
import { applicationFeatures } from "./constants";

const Home = () => {
  const router = useRouter();

  return (
    <div className="pl-5">
      <Stack alignItems={"center"} justifyContent={"center"} spacing={5}>
        <Stack spacing={5} width={"80%"}>
          <Stack
            alignItems={"center"}
            direction={"row"}
            justifyContent={"space-between"}
            width={"90%"}
          >
            <Button variant="bordered" color="primary" onClick={() => router.push("/generate")}>
              Generate Image
            </Button>
            <Button variant="bordered" color="secondary" onClick={() => router.push("editor")}>Edit Image</Button>
          </Stack>
          <div className="flex flex-wrap">
            {applicationFeatures.map((f) => (
              <FeatureCard key={f.title} feature={f} />
            ))}
          </div>
        </Stack>
        <Stack width={'80%'}>
          <Typography alignSelf={'start'}>Recents</Typography>
        </Stack>
      </Stack>
    </div>
  );
};

export default Home;
