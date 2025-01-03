import React from "react";
import { useForm } from "react-hook-form";

import FormCheckboxGroup from "./FormCheckboxGroup";
import { render, renderHook } from "setupTests";

describe("FormCheckbox", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(<FormCheckboxGroup control={control} name="" label="" items={[]} />);
  });
});
