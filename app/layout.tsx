import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import TopBar from "../components/topbar/TopBar";

import { Providers } from "./providers";
import Auth from "./auth/page";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import SideBar from "@/components/sidebar/SideBar";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { cn } from "@/utils/utils";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const client = createSupabaseServerClient();

  const userData = (await client.auth.getUser()).data.user;

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased ", fontSans.className, fontSans.variable)}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <div className="flex-1 absolute top-[50%] right-[0%] h-[200px] w-[400px] bg-blue-950 blur-[100px]" />
            <div className="flex-1 absolute top-[70%] left-[20%] h-[200px] w-[200px] bg-blue-950 blur-[100px]" />
            <div className="flex-1 absolute  top-[0%] left-[0%] h-[200px] w-[400px] bg-blue-950 blur-[200px]" />
            {!userData ? (
              <Auth />
            ) : (
              <div>
                <TopBar />
                <div className="flex h-[calc(100vh-64px)] overflow-hidden w-[100vw]">
                  <div className="flex-1">
                    <SideBar />
                  </div>
                  <main className="container  flex-[6]">{children}</main>
                </div>
              </div>
            )}
          </div>
        </Providers>
      </body>
    </html>
  );
}
