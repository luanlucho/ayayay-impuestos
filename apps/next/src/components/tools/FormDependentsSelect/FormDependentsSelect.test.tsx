import React from "react";
import { useForm } from "react-hook-form";

import FormDependentsSelect from "./FormDependentsSelect";
import { render, renderHook } from "setupTests";

describe("FormDependentsSelect", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(
      <FormDependentsSelect
        control={control}
        name="dependents"
        label="dependents"
      />
    );
  });
});
