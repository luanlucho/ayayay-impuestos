// FormCurrencyInput types and interfaces
import { FieldValues } from "react-hook-form";

import { FormInputProps } from "../FormInput/FormInput.types";

// Component Props
export interface FormCurrencyInputProps<TSchema extends FieldValues>
  extends FormInputProps<TSchema> {
  className?: string;
  formatter: FormatByCurrencyOptions;
}

export interface FormatByCurrencyOptions
  extends Omit<Intl.NumberFormatOptions, "style"> {
  currency: Required<Intl.NumberFormatOptions["currency"]>;
  locale?: string;
  symbol?: string;
}
