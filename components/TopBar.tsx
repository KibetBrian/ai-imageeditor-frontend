import { Stack, Typography } from "@mui/material";
import { Avatar, AvatarIcon } from "@nextui-org/avatar";
import React from "react";

const TopBar = () => {
  return (
    <Stack alignItems={"center"} direction={"row"} height={"64px"} justifyContent={"space-between"} pl={2} pr={2}>
      <Typography variant="h5">PhotoEditorAi</Typography>

      <Avatar
        className="cursor-pointer"
        classNames={{
          base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
          icon: "text-black/80",
        }}
        icon={<AvatarIcon />}
      />
    </Stack>
  );
};

export default TopBar;
