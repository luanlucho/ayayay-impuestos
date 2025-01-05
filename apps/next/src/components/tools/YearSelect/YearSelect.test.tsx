import React from "react";

import YearSelect from "./YearSelect";
import { render } from "setupTests";

describe("YearSelect", () => {
  it("renders with default props", () => {
    render(<YearSelect name="select" countryCode="ec" />);
  });
});
