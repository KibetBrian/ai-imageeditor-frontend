"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import { GoogleIcon } from "@/assets/icons/icons";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";

const AuthButton = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const supabase = createSupabaseBrowserClient();

  const signinWithGoogle = async () => {
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth`,
      },
    });

    if (error) {
      setIsLoading(false);

      return;
    }

    router.push("/home");
  };

  return (
    <Button className="bg-white text-black" color="default" isLoading={isLoading} size="lg" startContent={<GoogleIcon />} variant="solid" onClick={signinWithGoogle}>
      Continue with Google
    </Button>
  );
};

export default AuthButton;
