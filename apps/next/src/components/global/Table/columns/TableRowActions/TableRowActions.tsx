import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { TableRowActionsProps as Props } from "./TableRowActions.types";
import TableRowCopyIdAction from "./actions/TableRowCopyIdAction/TableRowCopyIdAction";
import TableRowDeleteAction from "./actions/TableRowDeleteAction/TableRowDeleteAction";
import TableRowEditAction from "./actions/TableRowEditAction/TableRowEditAction";
import { Button } from "ui/button";
import { DropdownMenuLabel, DropdownMenuTrigger } from "ui/dropdown-menu";
import { DropdownMenu, DropdownMenuContent } from "ui/dropdown-menu";

const TableRowActions = (props: Props) => {
  const { className, children, title = "Actions" } = props;
  const [opened, setOpened] = useState(false);

  return (
    <DropdownMenu open={opened} onOpenChange={other => setOpened(other)}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={twMerge("TableRowActions", className)}
      >
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        {children}
      </DropdownMenuContent>
      {opened ? (
        <Button
          variant="ghost"
          className="invisible absolute -z-10 h-8 w-8 p-0"
          id="close-dropdown"
          onClick={() => setOpened(false)}
        >
          <span className="sr-only">Close menu</span>
        </Button>
      ) : null}
    </DropdownMenu>
  );
};

TableRowActions.CopyId = TableRowCopyIdAction;
TableRowActions.Edit = TableRowEditAction;
TableRowActions.Delete = TableRowDeleteAction;

export default TableRowActions;
