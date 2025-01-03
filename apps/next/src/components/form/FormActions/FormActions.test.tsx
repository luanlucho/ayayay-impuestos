import React from "react";

import FormActions from "./FormActions";
import { render } from "setupTests";

describe("FormActions", () => {
  it("renders with default props", () => {
    render(<FormActions formName="" />);
  });
});
