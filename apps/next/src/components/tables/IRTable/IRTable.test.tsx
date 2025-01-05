import React from "react";

import IRTable from "./IRTable";
import { render } from "setupTests";

describe("IRTable", () => {
  it("renders with default props", () => {
    render(<IRTable countryCode="ec" year={2024} filename="general" />);
  });
});
