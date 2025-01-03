// FormCheckbox types and interfaces
import { CheckedState } from "@radix-ui/react-checkbox";
import { FieldValues } from "react-hook-form";

import { FormFieldProps } from "types/form.types";

// Component Props
export interface FormCheckboxProps<TSchema extends FieldValues>
  extends FormFieldProps<TSchema> {
  onCheckedChange?: (checked: CheckedState) => void;
  disabled?: boolean;
}
