import React from "react";
import { useForm } from "react-hook-form";

import FormPercentageInput from "./FormPercentageInput";
import { render, renderHook } from "setupTests";

describe("FormPercentageInput", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(<FormPercentageInput control={control} label="" name="" />);
  });
});
