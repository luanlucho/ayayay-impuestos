"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { LogoProps as Props } from "./Logo.types";
import { DropdownMenu, DropdownMenuContent } from "ui/dropdown-menu";
import { DropdownMenuItem, DropdownMenuTrigger } from "ui/dropdown-menu";

const Logo = (props: Props) => {
  const { className } = props;
  const [open, setOpen] = useState(false);

  const rightClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setOpen(true);
  };

  const triggerNode = (
    <div className={twMerge("Logo flex items-center gap-2", className)}>
      <Image
        src="/assets/images/logo-white.svg"
        alt="Masivo logo"
        width={120}
        height={40}
        className="hidden h-10 w-[120px] dark:block"
      />
      <Image
        src="/assets/images/logo-black.svg"
        alt="Masivo logo"
        width={120}
        height={40}
        className="block h-10 w-[120px] dark:hidden"
      />
    </div>
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger onContextMenu={rightClickHandler}>
        {triggerNode}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/">Inicio</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="https://codepen.io/luanlucho/pen/qEWxwLo" target="_blank">
            Manual de marca
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Logo;
