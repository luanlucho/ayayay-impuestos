import React from "react";

import CountrySelect from "./CountrySelect";
import { render } from "setupTests";

describe("CountrySelect", () => {
  it("renders with default props", () => {
    render(<CountrySelect name="select" />);
  });
});
