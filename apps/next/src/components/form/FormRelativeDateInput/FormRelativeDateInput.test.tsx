import React from "react";
import { useForm } from "react-hook-form";

import FormRelativeDateInput from "./FormRelativeDateInput";
import { render, renderHook } from "setupTests";

describe("FormRelativeDateInput", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(<FormRelativeDateInput control={control} name="" label="" />);
  });
});
