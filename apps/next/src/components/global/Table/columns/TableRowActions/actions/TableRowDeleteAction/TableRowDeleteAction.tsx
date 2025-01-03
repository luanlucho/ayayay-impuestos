import React from "react";
import { twMerge } from "tailwind-merge";

import { TableRowDeleteActionProps as Props } from "./TableRowDeleteAction.types";
import { DropdownMenuItem } from "ui/dropdown-menu";

const TableRowDeleteAction = (props: Props) => {
  const { className, title = "Delete item", disabled } = props;

  return (
    <DropdownMenuItem
      onSelect={e => e.preventDefault()}
      className={twMerge("TableRowDeleteAction", className)}
      disabled={disabled}
    >
      {title}
    </DropdownMenuItem>
  );
};

export default TableRowDeleteAction;
