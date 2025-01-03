import React from "react";
import { useForm } from "react-hook-form";

import FormJsonEditor from "./FormJsonEditor";
import { render, renderHook } from "setupTests";

describe("FormJsonEditor", () => {
  it("renders with default props", () => {
    const { control } = renderHook(() => useForm()).result.current;
    render(<FormJsonEditor control={control} name="name" label="Your name" />);
  });
});
