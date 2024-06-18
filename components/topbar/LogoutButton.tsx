"use client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import React from "react";

import { createSupabaseBrowserClient } from "@/utils/supabase/client";

interface LogoutButtonProps {
  avatarUrl: string;
}

const LogoutButton = ({ avatarUrl }: LogoutButtonProps) => {
  const supabase = createSupabaseBrowserClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Tooltip title="Account">
      <Button isIconOnly style={{ borderRadius: "50%" }} onClick={handleLogout}>
        <Avatar src={avatarUrl} />
      </Button>
    </Tooltip>
  );
};

export default LogoutButton;
