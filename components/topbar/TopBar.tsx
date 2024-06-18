import { Stack, Typography } from "@mui/material";
import React from "react";

import LogoutButton from "./LogoutButton";

import { supabaseServerClient } from "@/utils/supabase";

const TopBar = async () => {
  const supabase = supabaseServerClient();

  const user = (await supabase.auth.getUser()).data.user;

  return (
    <Stack alignItems={"center"} direction={"row"} height={"64px"} justifyContent={"space-between"} pl={2} pr={2}>
      <Typography variant="h5">PhotoEditorAi</Typography>

      <LogoutButton avatarUrl={user?.user_metadata.avatar_url} />
    </Stack>
  );
};

export default TopBar;
