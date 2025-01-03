import React from "react";
import { useForm } from "react-hook-form";

import FormRadioGroup from "./FormRadioGroup";
import { render, renderHook } from "setupTests";

describe("FormRadioGroup", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(
      <FormRadioGroup
        control={control}
        label="Choose one"
        name="country"
        items={[]}
      />
    );
  });
});
