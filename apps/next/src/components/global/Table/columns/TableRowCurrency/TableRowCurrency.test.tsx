import React from "react";

import TableRowCurrency from "./TableRowCurrency";
import { render } from "setupTests";

describe("TableRowCurrency", () => {
  it("renders with default props", () => {
    render(<TableRowCurrency value={0} />);
  });
});
