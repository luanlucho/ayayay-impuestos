// List types and interfaces

import { NavigationMenuItem } from "../VerticalNavigationMenu/VerticalNavigationMenu.types";

// Component Props
export interface ListProps {
  className?: string;
  items?: NavigationMenuItem[];
  setValue: (value: string) => void;
  value: string;
  state?: "collapsed" | "expanded";
  onStateChange?: (value: "collapsed" | "expanded") => void;
}
