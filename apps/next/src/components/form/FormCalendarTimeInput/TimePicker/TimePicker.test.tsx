import React from "react";

import TimePicker from "./TimePicker";
import { render } from "setupTests";

describe("TimePicker", () => {
  it("renders with default props", () => {
    render(<TimePicker value={new Date()} onChange={() => {}} />);
  });
});
