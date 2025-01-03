import React from "react";
import { useForm } from "react-hook-form";

import FormInput from "./FormInput";
import { render, renderHook } from "setupTests";

describe("FormInput", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(<FormInput control={control} name="name" label="Your name" />);
  });
});
