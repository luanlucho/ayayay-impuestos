import React from "react";

import FormSection from "./FormSection";
import { render } from "setupTests";

describe("FormSection", () => {
  it("renders with default props", () => {
    render(
      <FormSection title="" description="">
        <div />
      </FormSection>
    );
  });
});
