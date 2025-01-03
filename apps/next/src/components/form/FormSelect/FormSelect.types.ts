// FormSelect types and interfaces
import { SelectValueProps } from "@radix-ui/react-select";
import { FieldValues } from "react-hook-form";

import { FormFieldProps } from "types/form.types";

// Component Props
export interface FormSelectProps<TSchema extends FieldValues>
  extends FormFieldProps<TSchema>,
    Omit<SelectValueProps, "defaultChecked" | "defaultValue"> {
  contentClassName?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}
