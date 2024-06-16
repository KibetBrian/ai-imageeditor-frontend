import React from "react";
import { User } from "@nextui-org/user";
import { Stack } from "@mui/material";
import { Card } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";

import Navigation from "./components/Navigation";

import { CreditsIcon } from "@/assets/icons/icons";

const SideBar = () => {
  return (
    <Stack p={1} spacing={5}>
      <Card className="h-[90px] p-2 space-y-2" radius="sm">
        <Stack alignItems={"start"} ml={2} spacing={1}>
          <User
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            description="Product Designer"
            name="Jane Doe"
          />
          <div className="flex ">
            <Chip radius="sm" startContent={<CreditsIcon className="w-[20px]" />} variant="bordered">
              1000
            </Chip>
          </div>
        </Stack>
      </Card>
      <Navigation />
    </Stack>
  );
};

export default SideBar;
