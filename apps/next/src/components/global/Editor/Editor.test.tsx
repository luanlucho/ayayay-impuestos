import React from "react";

import Editor from "./Editor";
import { render } from "setupTests";

describe("Editor", () => {
  it("renders with default props", () => {
    render(<Editor />);
  });
});
