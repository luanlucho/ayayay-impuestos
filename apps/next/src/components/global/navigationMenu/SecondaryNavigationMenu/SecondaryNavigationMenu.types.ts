// SecondaryNavigationMenu types and interfaces
import { LucideIcon } from "lucide-react";

// Component Props
export interface SecondaryNavigationMenuProps {
  className?: string;
  basePath: string;
  items: NavigationMenuItem[];
}

export interface NavigationMenuItem {
  title: string;
  icon?: LucideIcon;
  base?: string;
  href: string;
  items?: NavigationMenuItem[];
  separator?: true;
  soon?: boolean;
}
