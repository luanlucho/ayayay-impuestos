import { List } from "@radix-ui/react-navigation-menu";
import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";

import { ListProps as Props } from "./List.types";
import ListItemLink from "../ListItemLink/ListItemLink";
import Sub from "../Sub/Sub";
import { Badge } from "ui/badge";
import { Separator } from "ui/separator";

const VerticalNavigationMenuList = (props: Props) => {
  const { className, items, setValue, value, state, onStateChange } = props;
  return (
    <List
      className={twMerge("flex flex-col gap-1", className)}
      data-state={state}
    >
      {items?.map(item => {
        const { title, href, icon, items, base, separator, soon } = item;
        const hasSub = items && items.length > 0;
        let separatorNode = null;
        const className = "w-[90%] mx-auto";
        if (separator) separatorNode = <Separator className={className} />;

        const clickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
          // Prevent parent sub from triggering its onClick
          e.stopPropagation();
          setValue(href);
          onStateChange?.("collapsed");
        };

        if (hasSub) {
          return (
            <Fragment key={href}>
              {separatorNode}
              <Sub
                item={item}
                parentSetValue={setValue}
                parentValue={value}
                onStateChange={onStateChange}
              />
            </Fragment>
          );
        }
        return (
          <Fragment key={title}>
            {separatorNode}
            <ListItemLink
              href={href}
              icon={icon}
              activeHref={base}
              onClick={clickHandler}
              disabled={soon}
              className="first:pt-1"
            >
              <div
                className={twMerge(
                  "relative flex justify-between gap-1 truncate group-data-[state=collapsed]/list:absolute group-data-[state=collapsed]/list:opacity-0"
                )}
              >
                <span className="flex-1 truncate">{title}</span>
                {soon ? (
                  <Badge className="right-0 h-4 translate-y-0.5 px-1 py-0 text-[10px] font-bold leading-[0px]">
                    Soon
                  </Badge>
                ) : null}
              </div>
            </ListItemLink>
          </Fragment>
        );
      })}
    </List>
  );
};

export default VerticalNavigationMenuList;
