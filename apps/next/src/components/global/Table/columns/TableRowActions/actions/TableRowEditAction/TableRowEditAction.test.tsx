import React from "react";

import TableRowEditAction from "./TableRowEditAction";
import { render } from "setupTests";
import { DropdownMenu, DropdownMenuContent } from "ui/dropdown-menu";

describe("TableRowEditAction", () => {
  it("renders with default props", () => {
    render(
      <DropdownMenu>
        <DropdownMenuContent>
          <TableRowEditAction href="/" />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  });
});
