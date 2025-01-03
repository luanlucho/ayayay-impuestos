import React from "react";
import { useForm } from "react-hook-form";

import FormTextarea from "./FormTextarea";
import { render, renderHook } from "setupTests";

describe("FormTextarea", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(<FormTextarea control={control} name="name" label="Your name" />);
  });
});
