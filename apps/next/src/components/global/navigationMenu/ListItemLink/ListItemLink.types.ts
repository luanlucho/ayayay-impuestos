// ListItemLink types and interfaces
import { LucideIcon } from "lucide-react";
import { LinkProps } from "next/link";

// Component Props
export interface ListItemLinkProps extends Omit<LinkProps, "onClick"> {
  className?: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  activeHref?: string;
  onClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  disabled?: boolean;
}
