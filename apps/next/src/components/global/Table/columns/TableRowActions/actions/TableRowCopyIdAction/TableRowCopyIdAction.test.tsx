import React from "react";

import TableRowCopyIdAction from "./TableRowCopyIdAction";
import { render } from "setupTests";
import { DropdownMenu, DropdownMenuContent } from "ui/dropdown-menu";

describe("TableRowCopyIdAction", () => {
  it("renders with default props", () => {
    render(
      <DropdownMenu>
        <DropdownMenuContent>
          <TableRowCopyIdAction id="" entity="tier" />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  });
});
