"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { ThemeToggleProps as Props } from "./ThemeToggle.types";

const ThemeToggle = (props: Props) => {
  const { className } = props;
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const renderIcon = () => {
    if (!mounted) return <Moon />;
    return resolvedTheme === "dark" ? <Moon /> : <Sun />;
  };

  return (
    <div
      className={twMerge(
        "ThemeToggle flex items-center justify-center",
        className
      )}
    >
      <button
        className="h-6 w-6"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {renderIcon()}
      </button>
    </div>
  );
};

export default ThemeToggle;
