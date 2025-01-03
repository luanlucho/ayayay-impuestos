import React from "react";
import { useForm } from "react-hook-form";

import FormSwitch from "./FormSwitch";
import { render, renderHook } from "setupTests";

describe("FormSwitch", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(<FormSwitch control={control} name="" label="" />);
  });
});
