import React from "react";

import Pagination from "./Pagination";
import { render } from "setupTests";

describe("Pagination", () => {
  it("renders with default props", () => {
    render(<Pagination count={100} page={1} size={10} />);
  });
});
