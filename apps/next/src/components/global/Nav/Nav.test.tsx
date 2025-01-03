import React from "react";

import Nav from "./Nav";
import { render } from "setupTests";

describe("Nav", () => {
  it("renders with default props", () => {
    render(
      <Nav>
        <Nav.Item href="/">home</Nav.Item>
        <Nav.Item href="/about">about</Nav.Item>
      </Nav>
    );
  });
});
