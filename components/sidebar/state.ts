import { create } from "zustand";
import { persist } from "zustand/middleware";

import { navData } from "./data";
import { NavItem } from "./types";

interface SidebarState {
  selectedMenu: NavItem;
  setSelectedMenu: (item: NavItem) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      selectedMenu: navData[0],
      setSelectedMenu: (item: NavItem) => set({ selectedMenu: item }),
    }),
    {
      name: "sidebar-state",
    },
  ),
);
