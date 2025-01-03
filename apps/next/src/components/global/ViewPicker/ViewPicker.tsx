"use client";
import { GanttChartSquareIcon, TableIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

import { ViewPickerProps as Props, Views } from "./ViewPicker.types";
import { Button } from "ui/button";

const ViewPicker = (props: Props) => {
  const { className, defaultView = "gantt" } = props;
  const searchParams = useSearchParams();
  const view = searchParams.get("view") ?? defaultView;
  const router = useRouter();
  const pathname = usePathname();

  const changeViewHandler = (view: Views) => {
    const params = new URLSearchParams(searchParams);
    params.set("view", view);
    router.replace(`${pathname}?${params}`);
  };

  const buttonClassName = "h-8 py-1 px-2 text-muted-foreground";
  const iconClassName =
    "w-5 h-5 cursor-pointer hover:text-foreground/70 transition-colors";
  const iconActiveClassName = "text-foreground hover:text-foreground";

  return (
    <div
      className={twMerge(
        "ViewPicker text-muted-foreground flex items-center justify-end gap-1",
        className
      )}
    >
      <span className="pr-2">View: </span>
      <Button
        variant="secondary"
        className={buttonClassName}
        title="Gantt view"
        onClick={() => changeViewHandler("gantt")}
      >
        <GanttChartSquareIcon
          className={twMerge(
            iconClassName,
            view === "gantt" ? iconActiveClassName : ""
          )}
        />
      </Button>
      <Button
        variant="secondary"
        className={buttonClassName}
        title="Table view"
        onClick={() => changeViewHandler("table")}
      >
        <TableIcon
          className={twMerge(
            iconClassName,
            view === "table" ? iconActiveClassName : ""
          )}
        />
      </Button>
    </div>
  );
};

export default ViewPicker;
