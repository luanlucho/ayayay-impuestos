import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import { TableRowEditActionProps as Props } from "./TableRowEditAction.types";
import { DropdownMenuItem } from "ui/dropdown-menu";

const TableRowEditAction = (props: Props) => {
  const { className, href, title = "Edit item" } = props;

  return (
    <Link href={href}>
      <DropdownMenuItem className={twMerge("TableRowEditAction", className)}>
        {title}
      </DropdownMenuItem>
    </Link>
  );
};

export default TableRowEditAction;
