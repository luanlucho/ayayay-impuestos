import React from "react";
import { useForm } from "react-hook-form";

import FormPaymentMethodsSelect from "./FormPaymentMethodsSelect";
import { render, renderHook } from "setupTests";

describe("FormPaymentMethodsSelect", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(
      <FormPaymentMethodsSelect
        control={control}
        name="payment_method"
        label="Payment method"
      />
    );
  });
});
