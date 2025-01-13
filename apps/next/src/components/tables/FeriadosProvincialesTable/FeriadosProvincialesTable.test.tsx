import React from "react";

import FeriadosProvicialesTable from "./FeriadosProvincialesTable";
import { render } from "setupTests";

describe("FeriadosProvicialesTable", () => {
  it("renders with default props", () => {
    render(
      <FeriadosProvicialesTable
        countryCode="ec"
        year={2024}
        filename="general"
      />
    );
  });
});
