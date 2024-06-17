"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import useMounted from "@/hooks/useMounted";

interface AuthLayoutInterface {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutInterface) => {
  const router = useRouter();

  const isMounted = useMounted();

  if (!isMounted) return null;

  const client = createSupabaseBrowserClient();

  const user = await client.auth.getUser();

  const userData = user.data.user;

  if (userData) {
    router.back();
  }

  return <div>{children}</div>;
};

export default AuthLayout;
