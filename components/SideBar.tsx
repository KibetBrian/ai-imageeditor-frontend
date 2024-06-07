"use client";
import React, { SVGProps } from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import { HomeIcon, PreviousGenerationsIcon } from "@/assets/icons/icons";

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
  );
};

export default SideBar;
