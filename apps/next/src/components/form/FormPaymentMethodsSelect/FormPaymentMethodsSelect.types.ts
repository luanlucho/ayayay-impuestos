// FormPaymentMethodsSelect types and interfaces

import { FieldValues } from "react-hook-form";

import { FormSelectProps } from "../FormSelect/FormSelect.types";

// Component Props
export interface FormPaymentMethodsSelectProps<TSchema extends FieldValues>
  extends FormSelectProps<TSchema> {
  className?: string;
}
