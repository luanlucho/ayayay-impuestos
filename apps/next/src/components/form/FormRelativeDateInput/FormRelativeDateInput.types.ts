// FormRelativeDateInput types and interfaces

import { FieldValues } from "react-hook-form";

import { FormFieldProps } from "types/form.types";

// Component Props
export interface FormRelativeDateInputProps<TSchema extends FieldValues>
  extends FormFieldProps<TSchema> {
  placeholder?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}
