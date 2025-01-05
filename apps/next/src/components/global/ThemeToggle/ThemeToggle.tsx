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
    const props = { width: 20, height: 20 };
    if (!mounted) return <Moon {...props} />;
    return resolvedTheme === "dark" ? <Moon {...props} /> : <Sun {...props} />;
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
