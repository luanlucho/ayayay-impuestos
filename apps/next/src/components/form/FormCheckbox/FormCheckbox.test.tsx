import React from "react";
import { useForm } from "react-hook-form";

import FormCheckbox from "./FormCheckbox";
import { render, renderHook } from "setupTests";

describe("FormCheckbox", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(<FormCheckbox control={control} name="" label="" />);
  });
});
