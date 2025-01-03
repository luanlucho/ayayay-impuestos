import React from "react";
import { useForm } from "react-hook-form";

import FormEmptyInput from "./FormEmptyInput";
import { render, renderHook } from "setupTests";

describe("FormEmptyInput", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(
      <FormEmptyInput
        href="/products"
        control={control}
        name="name"
        label="Your name"
        title="Create product"
      />
    );
  });
});
