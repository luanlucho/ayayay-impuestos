"use client";
import { Root } from "@radix-ui/react-navigation-menu";
import invariant from "invariant";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { SecondaryNavigationMenuProps as Props } from "./SecondaryNavigationMenu.types";
import List from "../List/List";

const SecondaryNavigationMenu = (props: Props) => {
  const { className, basePath, items } = props;
  const pathname = usePathname();
  const selectedPath = pathname.split(basePath)[1];
  const selectedPathError = `Selected path is malformed, check your basePath ${basePath}`;
  invariant(typeof selectedPath === "string", selectedPathError);
  const [value, setValue] = useState(`/${selectedPath.split("/")[1]}`);

  return (
    <Root
      orientation="vertical"
      className={twMerge("SecondaryNavigationMenu !w-full", className)}
      value={value}
    >
      <List
        items={items}
        setValue={setValue}
        value={value}
        className="max-h-[calc(100dvh-96px-80px-60px-var(--pad))] overflow-y-auto overflow-x-hidden pb-1 [&>li>a]:w-[calc(100%-16px)] [&>li>a]:px-3"
      />
    </Root>
  );
};

export default SecondaryNavigationMenu;
