import React from "react";
import { twMerge } from "tailwind-merge";

import { NavbarProps as Props } from "./Navbar.types";
import CommandBar from "../CommandBar/CommandBar";
import Logo from "../Logo/Logo";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = async (props: Props) => {
  const { className } = props;

  return (
    <div
      className={twMerge(
        "Navbar bg-background relative flex h-[--navbar-height] items-center border-b shadow",
        className
      )}
    >
      <aside className="absolute left-0 top-0 flex h-full items-center px-[--pad]">
        <Logo width={24} />
      </aside>
      <div className="layout flex-1">
        <nav className="layout-content flex items-center justify-between gap-4 pl-[116px]">
          <CommandBar className="max-w-[600px]" />
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
