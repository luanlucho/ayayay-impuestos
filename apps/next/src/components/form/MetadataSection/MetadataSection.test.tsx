import React from "react";

import MetadataSection from "./MetadataSection";
import { render } from "setupTests";

describe("MetadataSection", () => {
  it("renders with default props", () => {
    render(<MetadataSection defaultValue="{}" entity="product" />);
  });
});
