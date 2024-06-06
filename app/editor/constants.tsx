import { MenuControl } from "./types";

import {
  DrawIcon,
  EraseIcon,
  ImageIcon,
  SelectCanvasItemIcon,
} from "@/icons/icons";

export const MenuControls: MenuControl[] = [
  {
    title: "Select",
    icon: <SelectCanvasItemIcon className="w-[20px]" />,
  },
  {
    title: "Draw",
    icon: <DrawIcon className="w-[20px]" />,
  },
  {
    title: "Erase",
    icon: <EraseIcon className="w-[20px]" />,
  },
  {
    title: "Image",
    icon: <ImageIcon className="w-[20px]" />,
  },
];

export const imageAddress =
  "https://images.pexels.com/photos/18983112/pexels-photo-18983112/free-photo-of-table-after-breakfast-full-of-fruits.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
