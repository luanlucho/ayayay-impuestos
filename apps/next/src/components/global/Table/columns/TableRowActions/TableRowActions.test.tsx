import React from "react";

import TableRowActions from "./TableRowActions";
import { render } from "setupTests";
import { DropdownMenuItem } from "ui/dropdown-menu";

describe("TableRowActions", () => {
  it("renders with default props", () => {
    render(
      <TableRowActions>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </TableRowActions>
    );
  });
});
