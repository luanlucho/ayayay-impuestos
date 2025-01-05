"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

import { NavbarProps as Props } from "./Navbar.types";
import Logo from "../Logo/Logo";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import CountrySelect from "components/tools/CountrySelect/CountrySelect";
import YearSelect from "components/tools/YearSelect/YearSelect";

const Navbar = (props: Props) => {
  const { className, countryCode, year } = props;
  const { push } = useRouter();

  const changeCountryHandler = (value: string) => {
    push(`/${value}/${year}`);
  };

  const changeYearHandler = (value: string) => {
    push(`/${countryCode}/${value}`);
  };

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
          <div className="flex items-center gap-1">
            <YearSelect
              value={year}
              onValueChange={changeYearHandler}
              countryCode={countryCode}
            />
            <CountrySelect
              value={countryCode}
              onValueChange={changeCountryHandler}
            />
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
