import React from "react";

import CalculatorResult from "./CalculatorResult";
import { render } from "setupTests";

describe("CalculatorResult", () => {
  it("renders with default props", () => {
    render(<CalculatorResult data={[]} />);
  });
});
