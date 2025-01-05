import { render as rtlRender } from "@testing-library/react";
import { RenderOptions as rtlRenderOptions } from "@testing-library/react";
import { RenderResult } from "@testing-library/react";
import { renderHook as rtlRenderHook } from "@testing-library/react";
import React from "react";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Providers from "components/global/Providers/Providers";

interface RenderOptions extends Omit<rtlRenderOptions, "queries"> {}

interface FormProps {
  defaultValues: Record<string, any>;
}

interface WrapperProps {
  children?: ReactNode;
  form?: FormProps;
}

export const Wrapper: React.FC<WrapperProps> = props => {
  const { children, form } = props;
  const formMethods = useForm(form);
  return (
    <Providers>
      <FormProvider {...formMethods}>{children}</FormProvider>
    </Providers>
  );
};

export const render = (
  ui: React.ReactElement,
  options: RenderOptions = {}
): RenderResult => {
  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

export const renderHook: typeof rtlRenderHook = (hook, options = {}) => {
  return rtlRenderHook(hook, { wrapper: Wrapper, ...options });
};
