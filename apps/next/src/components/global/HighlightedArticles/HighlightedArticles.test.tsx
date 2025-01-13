import React from "react";

import HighlightedArticles from "./HighlightedArticles";
import { render } from "setupTests";

describe("HighlightedArticles", () => {
  it("renders with default props", () => {
    render(<HighlightedArticles year={2025} countryCode="ec" />);
  });
});
