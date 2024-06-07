"use client";
import React, { SVGProps } from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { User } from "@nextui-org/user";
import { Stack } from "@mui/material";
import { Card } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";

import {
  CreditsIcon,
  HomeIcon,
  PreviousGenerationsIcon,
} from "@/assets/icons/icons";

interface Menu {
  title: string;
  path: string;
  // eslint-disable-next-line no-unused-vars
  icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
}

const SideBar = () => {
  const router = useRouter();

  const [selectedButton, setSelectedButton] = React.useState("Home");

  const iconClasses =
    "text-xl h-[30px] text-default-500 pointer-events-none flex-shrink-0";

  const menu: Menu[] = [
    {
      title: "Home",
      path: "/home",
      icon: HomeIcon,
    },
    {
      title: "Recents",
      path: "recents",
      icon: PreviousGenerationsIcon,
    },
  ];

  const handleMenuClick = (item: Menu) => {
    setSelectedButton(item.title);
    router.push(item.path);
  };

  return (
    <Stack mt={5} spacing={5}>
      <Card className="h-[90px] p-2 space-y-2" radius="sm">
        <Stack alignItems={"start"} spacing={1} ml={2}>
          <User
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            description="Product Designer"
            name="Jane Doe"
          />
          <div className="flex ">
            <Chip
              radius="sm"
              startContent={<CreditsIcon className="w-[20px]" />}
              variant="bordered"
            >
              1000
            </Chip>
          </div>
        </Stack>
      </Card>
      <div className="flex flex-col gap-3">
        {menu.map((item, index) => {
          const Icon = item.icon;

          return (
            <Button
              key={index}
              className="rounded-md"
              startContent={<Icon className={iconClasses} />}
              variant={selectedButton === item.title ? "solid" : "flat"}
              onClick={() => handleMenuClick(item)}
            >
              {item.title}
            </Button>
          );
        })}
      </div>
    </Stack>
  );
};

export default SideBar;
