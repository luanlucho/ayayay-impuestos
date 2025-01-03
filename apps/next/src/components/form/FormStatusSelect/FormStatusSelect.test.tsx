import React from "react";
import { useForm } from "react-hook-form";

import FormStatusSelect from "./FormStatusSelect";
import { render, renderHook } from "setupTests";

describe("FormStatusSelect", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(
      <FormStatusSelect
        control={control}
        statuses={["active"]}
        name="status"
        label="status"
      />
    );
  });
});
