import React from "react";

import CommandBar from "./CommandBar";
import { render } from "setupTests";

describe("CommandBar", () => {
  it("renders with default props", () => {
    render(<CommandBar />);
  });
});
