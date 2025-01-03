"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { NavItemProps as Props } from "./NavItem.types";
import { Badge } from "ui/badge";

const NavItem = (props: Props) => {
  const { className, href, children, exact = true, soon, exclude = [] } = props;
  const { disabled } = props;
  const pathname = usePathname();

  const isActive = useMemo(() => {
    if (exact) return pathname === href;
    if (!pathname.startsWith(href)) return false;
    // If the path is excluded, it's not active
    return !exclude.some(path => pathname.startsWith(path));
  }, [pathname, href, exact, exclude]);

  return (
    <li
      className={twMerge(
        "NavItem text-foreground hover:text-foreground relative rounded px-2 py-1 text-sm transition-colors",
        className,
        isActive ? "text-foreground bg-muted" : "text-muted-foreground",
        disabled ? "pointer-events-none opacity-60" : ""
      )}
    >
      <Link href={href}>{children}</Link>
      {soon ? (
        <Badge className="absolute right-0 top-0 h-3 -translate-y-1/4 translate-x-1/2 px-1 py-0 text-[8px] font-bold leading-[0px]">
          Soon
        </Badge>
      ) : null}
    </li>
  );
};

export default NavItem;
