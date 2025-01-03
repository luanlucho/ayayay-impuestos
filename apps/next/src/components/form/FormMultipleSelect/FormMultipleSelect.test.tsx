import React from "react";
import { useForm } from "react-hook-form";

import FormMultipleSelect from "./FormMultipleSelect";
import { render, renderHook } from "setupTests";

describe("FormMultipleSelect", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(
      <FormMultipleSelect
        options={[]}
        control={control}
        onCreated={() => {}}
        label="Choose"
        name="label"
      />
    );
  });
});
