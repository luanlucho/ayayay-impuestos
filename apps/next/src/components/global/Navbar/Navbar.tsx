import React from "react";
import { twMerge } from "tailwind-merge";

import { NavbarProps as Props } from "./Navbar.types";
import Logo from "../Logo/Logo";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = async (props: Props) => {
  const { className } = props;

  return (
    <div
      className={twMerge(
        "Navbar bg-background layout relative h-[--navbar-height] flex-1 grid-rows-1 items-center border-b",
        className
      )}
    >
      <nav className="layout-content flex items-center justify-between gap-4">
        <Logo />

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
