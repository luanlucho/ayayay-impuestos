import React from "react";
import { useForm } from "react-hook-form";

import FormApiKeyInput from "./FormApiKeyInput";
import { render, renderHook } from "setupTests";

describe("FormApiKeyInput", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(<FormApiKeyInput control={control} name="name" label="Your name" />);
  });
});
