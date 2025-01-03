import React from "react";

import WarningTooltip from "./WarningTooltip";
import { render } from "setupTests";

describe("WarningTooltip", () => {
  it("renders with default props", () => {
    render(<WarningTooltip message="disabled">content</WarningTooltip>);
  });
});
