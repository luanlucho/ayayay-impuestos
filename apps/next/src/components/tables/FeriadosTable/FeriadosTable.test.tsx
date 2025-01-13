import React from "react";

import FeriadosTable from "./FeriadosTable";
import { render } from "setupTests";

describe("FeriadosTable", () => {
  it("renders with default props", () => {
    render(<FeriadosTable countryCode="ec" year={2024} filename="general" />);
  });
});
