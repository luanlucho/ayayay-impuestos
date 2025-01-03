import React from "react";
import { useForm } from "react-hook-form";

import FormCalendarTimeInput from "./FormCalendarTimeInput";
import { render, renderHook } from "setupTests";

describe("FormCalendarTimeInput", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(<FormCalendarTimeInput control={control} name="" label="" />);
  });
});
