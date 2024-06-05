"use client";
import React from "react";
import { Button } from "@nextui-org/button";

import { HomeIcon, PreviousGenerationsIcon } from "@/icons/icons";

const SideBar = () => {
  const [selectedButton, setSelectedButton] = React.useState("Home");

  const iconClasses =
    "text-xl h-[30px] text-default-500 pointer-events-none flex-shrink-0";

  const menu = [
    {
      title: "Home",
      icon: HomeIcon,
    },
    {
      title: "Recents",
      icon: PreviousGenerationsIcon,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {menu.map((item, index) => {
        const Icon = item.icon;

        return (
          <Button
            key={index}
            className="rounded-md"
            startContent={<Icon className={iconClasses} />}
            variant={selectedButton === item.title ? "solid" : "flat"}
            onClick={() => setSelectedButton(item.title)}
          >
            {item.title}
          </Button>
        );
      })}
    </div>
  );
};

export default SideBar;
