import React from "react";
import { useForm } from "react-hook-form";

import FormTemporalIntervalSelect from "./FormTemporalIntervalSelect";
import { render, renderHook } from "setupTests";

describe("FormTemporalIntervalSelect", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(<FormTemporalIntervalSelect control={control} name="" label="" />);
  });
});
