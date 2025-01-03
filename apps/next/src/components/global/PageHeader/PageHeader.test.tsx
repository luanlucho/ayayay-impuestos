import React from "react";

import PageHeader from "./PageHeader";
import { render } from "setupTests";

describe("PageHeader", () => {
  it("renders with default props", () => {
    render(<PageHeader title="Campaigns" />);
  });
});
