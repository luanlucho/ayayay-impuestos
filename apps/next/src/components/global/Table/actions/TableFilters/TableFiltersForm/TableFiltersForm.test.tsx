import React from "react";

import TableFiltersForm from "./TableFiltersForm";
import { render } from "setupTests";
import { buildTableFilterValues } from "test/builders/table.builders";

describe("TableFiltersForm", () => {
  it("renders with default props", () => {
    render(<TableFiltersForm values={buildTableFilterValues()} />);
  });
});
