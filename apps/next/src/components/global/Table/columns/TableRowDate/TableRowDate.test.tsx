import React from "react";

import TableRowDate from "./TableRowDate";
import { render } from "setupTests";

describe("TableRowDate", () => {
  it("renders with default props", () => {
    render(<TableRowDate date="" />);
  });
});
