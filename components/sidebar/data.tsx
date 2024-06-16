import { BackgroundRemovalIcon, DrawImageIcon, ObjectRemovalIcon, UncropIcon, UpscaleIcon } from "../icons";

import { NavItem } from "./types";

import { HomeIcon, PreviousGenerationsIcon } from "@/assets/icons/icons";

export const navData: NavItem[] = [
  {
    title: "Home",
    path: "/home",
    icon: HomeIcon,
  },
  {
    title: "Background Removal",
    path: "/background-removal",
    icon: BackgroundRemovalIcon,
  },
  {
    title: "Object Removal",
    path: "/object-removal",
    icon: ObjectRemovalIcon,
  },
  {
    title: "Upscale",
    path: "/upscale",
    icon: UpscaleIcon,
  },
  {
    title: "Object Addition",
    path: "/add-objects",
    icon: DrawImageIcon,
  },
  {
    title: "Uncrop",
    path: "/uncrop-image",
    icon: UncropIcon,
  },
  {
    title: "Recents",
    path: "/recents",
    icon: PreviousGenerationsIcon,
  },
];
