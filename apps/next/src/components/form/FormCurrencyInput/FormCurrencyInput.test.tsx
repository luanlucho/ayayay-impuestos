import React from "react";
import { useForm } from "react-hook-form";

import FormCurrencyInput from "./FormCurrencyInput";
import { render, renderHook } from "setupTests";

describe("FormCurrencyInput", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(
      <FormCurrencyInput
        control={control}
        label=""
        name=""
        formatter={{ currency: "USD" }}
      />
    );
  });
});
