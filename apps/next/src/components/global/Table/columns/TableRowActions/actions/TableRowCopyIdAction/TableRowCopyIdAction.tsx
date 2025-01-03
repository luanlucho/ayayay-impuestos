import { PopoverArrow } from "@radix-ui/react-popover";
import React, { useState } from "react";
import { flushSync } from "react-dom";
import { twMerge } from "tailwind-merge";

import { TableRowCopyIdActionProps as Props } from "./TableRowCopyIdAction.types";
import { DropdownMenuItem } from "ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "ui/popover";

const TableRowCopyIdAction = (props: Props) => {
  const { className, entity, id } = props;
  const [opened, setOpened] = useState(false);

  const copyHandler = async (e: Event) => {
    e.preventDefault();
    await navigator.clipboard.writeText(id);
    setOpened(true);
    setTimeout(() => {
      flushSync(() => setOpened(false));
      document.getElementById("close-dropdown")?.click();
    }, 500);
  };

  return (
    <DropdownMenuItem
      className={twMerge("TableRowCopyIdAction", className)}
      onSelect={copyHandler}
    >
      <Popover open={opened}>
        <PopoverTrigger asChild>
          <span>Copy {entity} ID</span>
        </PopoverTrigger>
        <PopoverContent side="top" className="w-max px-4 py-2">
          Copied!
          <PopoverArrow height={8} width={10} />
        </PopoverContent>
      </Popover>
    </DropdownMenuItem>
  );
};

export default TableRowCopyIdAction;
