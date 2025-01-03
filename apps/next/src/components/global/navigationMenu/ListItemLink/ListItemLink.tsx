import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { ListItemLinkProps as Props } from "./ListItemLink.types";
import { isItemActive } from "../VerticalNavigationMenu/VerticalNavigationMenu.helpers";
import { NavigationMenuItem, NavigationMenuLink } from "ui/navigation-menu";
import { navigationMenuTriggerStyle } from "ui/navigation-menu";

const ListItemLink = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const { className, children, icon: Icon, activeHref, ...rest } = props;
  const { onClick, disabled, ...rest2 } = rest;
  const pathname = usePathname();
  const href = rest.href.toString();
  const isActive = isItemActive(pathname, href, activeHref);

  const renderIcon = () => {
    if (!Icon) return null;
    return (
      <Icon
        width={20}
        height={20}
        className={twMerge(
          "mr-2 min-h-[20px] min-w-[24px]",
          isActive ? "stroke-primary" : "stroke-current"
        )}
      />
    );
  };

  return (
    <NavigationMenuItem
      className={twMerge(
        "ListItemLink group-data-[state=collapsed]/list:w-10 group-data-[state=expanded]/list:w-[calc(100%-16px)]",
        className,
        disabled ? "pointer-events-none opacity-60" : ""
      )}
      value={rest.href.toString()}
      onClick={onClick}
      onFocus={e => (disabled ? e.target.blur() : null)}
    >
      <Link legacyBehavior passHref ref={ref} prefetch {...rest2}>
        <NavigationMenuLink
          active={isActive}
          tabIndex={disabled ? -1 : 0}
          className={twMerge(
            navigationMenuTriggerStyle(),
            "hover:bg-primary/5 active:bg-primary/5 active:text-primary focus:outline-primary focus:text-primary relative mx-2 w-full justify-start bg-transparent p-0 px-2 focus:z-10 focus:outline",
            isActive ? "text-primary" : ""
          )}
        >
          {renderIcon()}
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
});

ListItemLink.displayName = "ListItemLink";

export default ListItemLink;
