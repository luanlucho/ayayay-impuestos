import React from "react";

import Logo from "./Logo";
import { render } from "setupTests";

describe("Logo", () => {
  it("renders with default props", () => {
    render(<Logo />);
  });
});
