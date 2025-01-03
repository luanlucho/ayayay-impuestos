import { Root } from "@radix-ui/react-navigation-menu";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { VerticalNavigationMenuProps as Props } from "./VerticalNavigationMenu.types";
import List from "../List/List";

const VerticalNavigationMenu = (props: Props) => {
  const { className, items } = props;
  const pathname = usePathname();
  const [value, setValue] = useState(`/${pathname.split("/")[1]}`);
  const [state, setState] = useState<"collapsed" | "expanded">("collapsed");
  const [closing, setClosing] = useState(false);

  const changeState = (value: "collapsed" | "expanded") => {
    if (closing) return;
    setState(value);
    // If the menu is collapsing, close all submenus
    if (value === "collapsed") setValue("/");
    setClosing(true);
    // Wait for the transition to finish otherwise it will trigger the onMouseEnter event
    setTimeout(() => setClosing(false), 200);
  };

  return (
    <Root
      orientation="vertical"
      className={twMerge(
        "VerticalNavigationMenu absolute z-50 w-full",
        className
      )}
      onMouseEnter={() => changeState("expanded")}
      onMouseLeave={() => changeState("collapsed")}
      data-state={state}
      value={value}
      onValueChange={value => setValue(value)}
    >
      <List
        items={items}
        setValue={setValue}
        state={state}
        value={value}
        onStateChange={value => changeState(value)}
        className="group/list max-h-[calc(100dvh-96px)] overflow-y-auto overflow-x-hidden pb-1 data-[state=collapsed]:w-14"
      />
    </Root>
  );
};

export default VerticalNavigationMenu;
