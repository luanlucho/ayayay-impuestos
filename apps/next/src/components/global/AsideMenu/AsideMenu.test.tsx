import React from "react";

import AsideMenu from "./AsideMenu";
import { render } from "setupTests";

describe("AsideMenu", () => {
  it("renders with default props", () => {
    render(<AsideMenu />);
  });
});
