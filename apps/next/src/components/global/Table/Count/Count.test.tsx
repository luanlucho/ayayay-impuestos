import React from "react";

import Count from "./Count";
import { render } from "setupTests";

describe("Count", () => {
  it("renders with default props", () => {
    render(<Count count={100} page={2} size={10} />);
  });
});
