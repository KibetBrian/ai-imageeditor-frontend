"use client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import React, { useState } from "react";

import { createSupabaseBrowserClient } from "@/utils/supabase/client";

interface LogoutButtonProps {
  avatarUrl: string;
}

const LogoutButton = ({ avatarUrl }: LogoutButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createSupabaseBrowserClient();

  const handleLogout = async () => {
    setIsLoading(true);

    await supabase.auth.signOut();

    setIsLoading(false);

    window.location.reload();
  };

  return (
    <Tooltip content="Account">
      <Button isIconOnly isLoading={isLoading} style={{ borderRadius: "50%" }} onClick={handleLogout}>
        <Avatar src={avatarUrl} />
      </Button>
    </Tooltip>
  );
};

export default LogoutButton;
