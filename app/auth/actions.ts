"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createSupabaseServerClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signinWithGoogle() {
  const supabase = createSupabaseServerClient();

  await supabase.auth.signInWithOAuth({
    provider: "google",
  });
}
