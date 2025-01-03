import React from "react";
import { useForm } from "react-hook-form";

import FormSelect from "./FormSelect";
import { render, renderHook } from "setupTests";

describe("FormSelect", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(<FormSelect control={control} label="Choose one" name="country" />);
  });
});
