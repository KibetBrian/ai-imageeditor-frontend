import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { StatusCodes } from "http-status-codes";

import { appConfigs } from "@/config/app";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/home";

  if (code) {
    const cookieStore = cookies();

    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.delete({ name, ...options });
        },
      },
    });

    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    try {
      const res = await fetch(`${appConfigs.backend}auth/sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.session?.access_token}`,
          body: JSON.stringify({}),
        },
      });

      if (res.status !== StatusCodes.OK) {
        await supabase.auth.signOut();

        return NextResponse.redirect(`${origin}/auth/auth-error`);
      }
    } catch (e) {
      await supabase.auth.signOut();

      return NextResponse.redirect(`${origin}/auth/auth-error`);
    }

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-error`);
}
