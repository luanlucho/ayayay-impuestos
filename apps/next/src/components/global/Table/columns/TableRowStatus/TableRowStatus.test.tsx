import React from "react";

import TableRowStatus from "./TableRowStatus";
import { render } from "setupTests";

describe("TableRowStatus", () => {
  it("renders with default props", () => {
    render(<TableRowStatus status="ACTIVE" />);
  });
});
