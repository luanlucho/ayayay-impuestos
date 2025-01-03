import React from "react";
import { useForm } from "react-hook-form";

import FormTimezonesSelect from "./FormTimezonesSelect";
import { render, renderHook } from "setupTests";

describe("FormTimezonesSelect", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(
      <FormTimezonesSelect control={control} label="timezone" name="timezone" />
    );
  });
});
