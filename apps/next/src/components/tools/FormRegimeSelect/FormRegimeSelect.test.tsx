import React from "react";
import { useForm } from "react-hook-form";

import FormRegimeSelect from "./FormRegimeSelect";
import { render, renderHook } from "setupTests";

describe("FormRegimeSelect", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(
      <FormRegimeSelect
        control={control}
        name="campaignType"
        label="campaignType"
      />
    );
  });
});
