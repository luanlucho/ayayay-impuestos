// FormChoiceInput types and interfaces
import { ReactNode } from "react";
import { FieldValues } from "react-hook-form";

import { FormFieldProps } from "types/form.types";

// Component Props
export interface FormChoiceInputProps<TSchema extends FieldValues>
  extends FormFieldProps<TSchema> {
  options: FormChoiceInputOption[];
  listClassName?: string;
  onValueChange?: (value: string | number | boolean) => void;
}

export interface FormChoiceInputOption {
  value: string | number | boolean;
  label: ReactNode;
  description?: ReactNode;
}
