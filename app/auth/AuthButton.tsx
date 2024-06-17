"use client";
import React from "react";
import { Button } from "@nextui-org/button";

import { GoogleIcon } from "@/assets/icons/icons";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";

const AuthButton = () => {
  const supabase = createSupabaseBrowserClient();

  const signinWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <Button className="bg-white text-black" color="default" size="lg" startContent={<GoogleIcon />} variant="solid" onClick={signinWithGoogle}>
      Continue with Google
    </Button>
  );
};

export default AuthButton;
