import React from "react";
import { twMerge } from "tailwind-merge";

import { NavProps as Props } from "./Nav.types";
import NavItem from "./NavItem/NavItem";

const Nav = (props: Props) => {
  const { className, children, listClassName } = props;

  return (
    <nav
      className={twMerge(
        "Nav h-[--nav-height] content-center border-b p-[--pad]",
        className
      )}
    >
      <ul className={twMerge("flex items-center gap-2", listClassName)}>
        {children}
      </ul>
    </nav>
  );
};

Nav.Item = NavItem;

export default Nav;
