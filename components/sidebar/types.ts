import { SVGProps } from "react";

export interface NavItem {
  title: string;
  path: string;
  // eslint-disable-next-line no-unused-vars
  icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
}
