import React from "react";
import { User } from "@nextui-org/user";
import { Stack } from "@mui/material";
import { Card } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";

import Navigation from "./components/Navigation";

import { CreditsIcon } from "@/assets/icons/icons";
import { supabaseServerClient } from "@/utils/supabase";

const SideBar = async () => {
  const supabase = supabaseServerClient();

  const user = (await supabase.auth.getUser()).data.user;

  return (
    <Stack p={1} spacing={5}>
      <Card className="h-[90px] cursor-pointer p-2 space-y-2" radius="sm">
        <Stack alignItems={"start"} ml={2} spacing={1}>
          <User
            avatarProps={{
              src: user?.user_metadata.avatar_url,
            }}
            name={user?.user_metadata.full_name}
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
