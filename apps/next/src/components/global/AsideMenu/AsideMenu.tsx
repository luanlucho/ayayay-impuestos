"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

import { menuItems } from "./AsideMenu.helpers";
import { AsideMenuProps as Props } from "./AsideMenu.types";
import VerticalNavigationMenu from "../navigationMenu/VerticalNavigationMenu/VerticalNavigationMenu";

const AsideMenu = (props: Props) => {
  const { className } = props;

  return (
    <aside
      className={twMerge(
        "AsideMenu min-w-14 max-w-[--aside-width] border-r",
        className
      )}
    >
      <VerticalNavigationMenu
        items={menuItems}
        className="bg-background min-h-full w-14 max-w-[--aside-width] border-r py-2 transition-[width] data-[state=expanded]:w-[--aside-width]"
      />
    </aside>
  );
};

export default AsideMenu;
