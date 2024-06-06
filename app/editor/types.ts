export type MenuTitle = "Draw" | "Erase" | "Image" | "Select";

export interface MenuControl {
  title: MenuTitle;
  icon: JSX.Element;
}
