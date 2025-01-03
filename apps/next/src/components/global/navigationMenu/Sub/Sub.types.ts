// Sub types and interfaces
import { NavigationMenuItem } from "../VerticalNavigationMenu/VerticalNavigationMenu.types";

// Component Props
export interface SubProps {
  className?: string;
  item: NavigationMenuItem;
  parentSetValue: (value: string) => void;
  parentValue: string;
  onStateChange?: (value: "collapsed" | "expanded") => void;
}
