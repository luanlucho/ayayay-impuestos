import React from "react";

import TableFilterOptionsDropdown from "./TableFilterOptionsDropdown";
import { render } from "setupTests";

describe("TableFilterOptionsDropdown", () => {
  it("renders with default props", () => {
    render(<TableFilterOptionsDropdown onSelect={() => {}} options={[]} />);
  });
});
