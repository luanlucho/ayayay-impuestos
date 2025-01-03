import React from "react";

import TableFilters from "./TableFilters";
import { render } from "setupTests";
import { buildTableFilterValues } from "test/builders/table.builders";

describe("TableFilters", () => {
  it("renders with default props", () => {
    render(<TableFilters values={buildTableFilterValues()} />);
  });
});
