import React from "react";

import NavItem from "./NavItem";
import { render } from "setupTests";

describe("NavItem", () => {
  it("renders with default props", () => {
    render(<NavItem href="/">home</NavItem>);
  });
});
