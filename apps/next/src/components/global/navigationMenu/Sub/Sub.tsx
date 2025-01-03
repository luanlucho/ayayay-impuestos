import { Sub, Content } from "@radix-ui/react-navigation-menu";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { SubProps as Props } from "./Sub.types";
import List from "../List/List";
import { isItemActive } from "../VerticalNavigationMenu/VerticalNavigationMenu.helpers";
import { NavigationMenuItem as Item } from "ui/navigation-menu";
import { NavigationMenuTrigger as Trigger } from "ui/navigation-menu";

const VerticalNavigationMenuSub = (props: Props) => {
  const { className, item, parentSetValue, parentValue, onStateChange } = props;
  const { title, icon, items, href, base } = item;
  const Icon = icon;
  const pathname = usePathname();
  const [value, setValue] = useState(`${href}/${pathname.split("/")[2]}`);
  const isActive = isItemActive(pathname, href, base, true);

  const changeHandler = () => {
    if (parentValue === href) parentSetValue("/");
    else parentSetValue(href);
  };

  const setValueHandler = (value: string) => {
    setValue(value);
    onStateChange?.("collapsed");
  };

  return (
    <Item
      key={title}
      value={href}
      onClick={changeHandler}
      className={className}
    >
      <Trigger
        onPointerMove={event => event.preventDefault()}
        onPointerLeave={event => event.preventDefault()}
        className={twMerge(
          "hover:text-primary focus:text-primary mx-2 justify-start gap-2 px-2 group-data-[state=collapsed]/list:w-10 group-data-[state=expanded]/list:w-[calc(var(--aside-width)-16px)]",
          // Make everything but the icon invisible and floating
          "[&>*:not(:first-child)]:group-data-[state=collapsed]/list:invisible [&>*:not(:first-child)]:group-data-[state=collapsed]/list:absolute",
          isActive
            ? "stroke-primary text-primary bg-primary/10"
            : "stroke-current text-current"
        )}
      >
        {Icon ? (
          <Icon width={20} height={20} className="stroke-inherit transition" />
        ) : null}
        <span className="relative text-inherit transition group-data-[state=collapsed]/list:absolute group-data-[state=collapsed]/list:opacity-0">
          {title}
        </span>
      </Trigger>
      <Content
        onPointerMove={event => event.preventDefault()}
        onPointerLeave={event => event.preventDefault()}
        className="group-data-[state=collapsed]/list:hidden"
      >
        <Sub orientation="vertical" value={value} className="ml-2 pt-1">
          <List
            items={items}
            setValue={setValueHandler}
            value={value}
            onStateChange={onStateChange}
          />
        </Sub>
      </Content>
    </Item>
  );
};

export default VerticalNavigationMenuSub;
