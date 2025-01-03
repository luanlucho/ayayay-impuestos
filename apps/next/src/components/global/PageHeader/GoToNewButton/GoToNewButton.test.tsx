import React from "react";

import GoToNewButton from "./GoToNewButton";
import { render } from "setupTests";

describe("GoToNewButton", () => {
  it("renders with default props", () => {
    render(<GoToNewButton href="/" title="/" />);
  });
});
