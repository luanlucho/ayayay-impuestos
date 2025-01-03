import React from "react";
import { useForm } from "react-hook-form";

import FormCalendarInput from "./FormCalendarInput";
import { render, renderHook } from "setupTests";

describe("FormCalendarInput", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(<FormCalendarInput control={control} name="" label="" />);
  });
});
