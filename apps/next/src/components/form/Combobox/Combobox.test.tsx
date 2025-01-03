import React from "react";

import Combobox from "./Combobox";
import { render } from "setupTests";

describe("Combobox", () => {
  it("renders with default props", () => {
    render(<Combobox items={[]} />);
  });
});
