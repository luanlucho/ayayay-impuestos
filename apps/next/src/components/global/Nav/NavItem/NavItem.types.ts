// NavItem types and interfaces

// Component Props
export interface NavItemProps {
  className?: string;
  href: string;
  children: React.ReactNode;
  exact?: boolean;
  exclude?: string[];
  disabled?: boolean;
  soon?: boolean;
}
