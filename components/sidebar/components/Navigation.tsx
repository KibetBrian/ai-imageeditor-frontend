"use client";
import React from "react";
import { Stack, Typography } from "@mui/material";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import { navData } from "../data";
import { NavItem } from "../types";

import useMounted from "@/hooks/useMounted";

const Navigation = () => {
  const router = useRouter();

  const mounted = useMounted();

  const [selectedButton, setSelectedButton] = React.useState("Home");

  const handleMenuClick = (item: NavItem) => {
    setSelectedButton(item.title);
    router.push(item.path);
  };

  const iconClasses = "text-xl h-[20px] text-default-500 pointer-events-none flex-shrink-0";

  if (!mounted) return null;

  return (
    <Stack>
      {navData.map((d) => {
        const Icon = d.icon;

        return (
          <Button
            key={d.path}
            radius="sm"
            style={{
              marginBottom: d.title === "Home" ? "30px" : "10px",
              marginTop: d.title === "Recents" ? "30px" : "0",
            }}
            variant={selectedButton === d.title ? "solid" : "flat"}
            onClick={() => handleMenuClick(d)}
          >
            <Stack alignItems={"center"} direction={"row"} p={1} spacing={2} width={"100%"}>
              <Button isIconOnly size="sm" startContent={<Icon className={iconClasses} />} variant="light" onClick={() => handleMenuClick(d)} />
              <Typography variant="body2">{d.title}</Typography>
            </Stack>
          </Button>
        );
      })}
    </Stack>
  );
};

export default Navigation;
