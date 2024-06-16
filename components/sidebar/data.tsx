import { NavItem } from "./types";

import { HomeIcon, PreviousGenerationsIcon } from "@/assets/icons/icons";

export const navData: NavItem[] = [
  {
    title: "Home",
    path: "/home",
    icon: HomeIcon,
  },
  {
    title: "Upscale",
    path: "/upscale",
    icon: HomeIcon,
  },
  {
    title: "Remove Object",
    path: "/object-removal",
    icon: HomeIcon,
  },
  {
    title: "Add Objects",
    path: "/add-objects",
    icon: HomeIcon,
  },
  {
    title: "Uncrop",
    path: "/uncrop-image",
    icon: HomeIcon,
  },
  {
    title: "Recents",
    path: "recents",
    icon: PreviousGenerationsIcon,
  },
];
