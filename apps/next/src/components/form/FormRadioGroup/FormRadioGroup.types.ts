// FormRadioGroup types and interfaces
import { RadioGroupProps } from "@radix-ui/react-radio-group";
import { RadioGroupItemProps } from "@radix-ui/react-radio-group";
import { FieldValues } from "react-hook-form";

import { FormFieldProps } from "types/form.types";

// Component Props
export interface FormRadioGroupProps<TSchema extends FieldValues>
  extends FormFieldProps<TSchema>,
    Omit<RadioGroupProps, "defaultChecked" | "defaultValue" | "name"> {
  contentClassName?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  items: (RadioGroupItemProps & { label?: string })[];
}
