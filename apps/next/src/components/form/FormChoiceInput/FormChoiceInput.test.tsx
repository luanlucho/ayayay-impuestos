import React from "react";
import { useForm } from "react-hook-form";

import FormChoiceInput from "./FormChoiceInput";
import { render, renderHook } from "setupTests";

describe("FormChoiceInput", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(
      <FormChoiceInput
        control={control}
        name="name"
        label="Your name"
        options={[]}
      />
    );
  });
});
