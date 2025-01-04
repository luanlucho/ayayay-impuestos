import React from "react";

import CalculatorForm from "./CalculatorForm";
import { render } from "setupTests";

describe("CalculatorForm", () => {
  it("renders with default props", () => {
    render(<CalculatorForm />);
  });
});
