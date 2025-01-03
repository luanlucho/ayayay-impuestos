import { Plus } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

import { TableFilterOptionsDropdownProps as Props } from "./TableFilterOptionsDropdown.types";
import { Button } from "ui/button";
import { DropdownMenu, DropdownMenuContent } from "ui/dropdown-menu";
import { DropdownMenuItem, DropdownMenuTrigger } from "ui/dropdown-menu";

const TableFilterOptionsDropdown = (props: Props) => {
  const { className, options, onSelect } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={!options.length}>
        <Button
          className={twMerge("TableFilterOptionsDropdown", className)}
          variant="ghost"
        >
          <Plus className="h-4 w-4" /> Add filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {options.map(option => {
          const { label } = option;
          return (
            <DropdownMenuItem key={label} onSelect={() => onSelect(option)}>
              {label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableFilterOptionsDropdown;
