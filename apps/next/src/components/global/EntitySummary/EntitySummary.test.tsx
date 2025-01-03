import React from "react";

import EntitySummary from "./EntitySummary";
import { render } from "setupTests";

describe("EntitySummary", () => {
  it("renders with default props", () => {
    render(<EntitySummary items={[]} />);
  });
});
