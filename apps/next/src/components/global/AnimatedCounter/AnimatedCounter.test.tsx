import React from "react";

import AnimatedCounter from "./AnimatedCounter";
import { render } from "setupTests";

describe("AnimatedCounter", () => {
  it("renders with default props", () => {
    render(<AnimatedCounter to={12345} />);
  });
});
