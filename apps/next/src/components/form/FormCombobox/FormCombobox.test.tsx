import React from "react";
import { useForm } from "react-hook-form";

import FormCombobox from "./FormCombobox";
import { render, renderHook } from "setupTests";

describe("FormCombobox", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(<FormCombobox control={control} items={[]} label="" name="" />);
  });
});
