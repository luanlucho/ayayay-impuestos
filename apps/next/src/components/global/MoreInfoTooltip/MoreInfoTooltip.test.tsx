import React from "react";

import MoreInfoTooltip from "./MoreInfoTooltip";
import { render } from "setupTests";

describe("MoreInfoTooltip", () => {
  it("renders with default props", () => {
    render(<MoreInfoTooltip>Test</MoreInfoTooltip>);
  });
});
