import React from "react";

import ThemeToggle from "./ThemeToggle";
import { render } from "setupTests";

describe("ThemeToggle", () => {
  it("renders with default props", () => {
    render(<ThemeToggle />);
  });
});
