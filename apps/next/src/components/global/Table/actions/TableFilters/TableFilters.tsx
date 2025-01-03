import { X, Filter } from "lucide-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { TableFiltersProps as Props } from "./TableFilters.types";
import TableFiltersForm from "./TableFiltersForm/TableFiltersForm";
import { Button } from "ui/button";
import { DropdownMenu, DropdownMenuContent } from "ui/dropdown-menu";
import { DropdownMenuLabel } from "ui/dropdown-menu";
import { DropdownMenuTrigger } from "ui/dropdown-menu";

const TableFilters = (props: Props) => {
  const { className, values } = props;
  const [open, setOpen] = useState(false);
  const hasAppliedFilters = Object.keys(values.filters).length > 0;
  const [applying, setApplying] = useState(hasAppliedFilters);
  const appliedCount = Object.keys(values.filters).length;
  const ruleText = appliedCount === 1 ? "rule" : "rules";
  const filteredTitle = `Filtered by ${appliedCount} ${ruleText}`;
  const title = appliedCount ? filteredTitle : "Filter";

  const openChangeHandler = (open: boolean) => {
    setOpen(open);
    if (!open) setApplying(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={openChangeHandler}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={twMerge(
            "TableFilters flex h-auto items-center gap-1 !rounded !border-none px-2 pb-1 pt-1.5 text-sm",
            open ? "bg-accent text-accent-foreground" : "",
            appliedCount
              ? "text-primary border-primary hover:bg-primary/20 hover:text-primary"
              : "",
            className
          )}
        >
          <Filter
            className={twMerge(
              "h-4 w-4",
              appliedCount ? "stroke-primary" : "stroke-muted-foreground"
            )}
          />{" "}
          <span>{title}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-96">
        <div
          className="invisible absolute right-2 top-2 cursor-pointer"
          onClick={() => setOpen(false)}
          id="close-dropdown"
        >
          <X className="h-4 w-4" />
        </div>
        {!applying ? (
          <>
            <DropdownMenuLabel className="py-0.5 text-sm">
              No filters have being applied yet
            </DropdownMenuLabel>
            <DropdownMenuLabel className="text-muted-foreground pb-2 pt-0 text-xs font-normal">
              Select an option to filter the table
            </DropdownMenuLabel>
          </>
        ) : null}
        <TableFiltersForm values={values} onApplying={setApplying} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableFilters;
