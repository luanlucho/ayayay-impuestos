import React from "react";

import TableRowDeleteAction from "./TableRowDeleteAction";
import { trpc } from "config/trpc.config";
import { render } from "setupTests";
import { DropdownMenu, DropdownMenuContent } from "ui/dropdown-menu";

describe("TableRowDeleteAction", () => {
  it("renders with default props", () => {
    render(
      <DropdownMenu>
        <DropdownMenuContent>
          <TableRowDeleteAction
            entity="tier"
            name="Bronce"
            id="0987654321"
            // @ts-expect-error
            mutation={trpc.general.currencies as any}
            onDeleteSuccess={() => {}}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  });
});
