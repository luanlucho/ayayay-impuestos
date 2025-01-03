// FormPercentageInput types and interfaces
import { FieldValues } from "react-hook-form";

import { FormInputProps } from "../FormInput/FormInput.types";

// Component Props
export interface FormPercentageInputProps<TSchema extends FieldValues>
  extends FormInputProps<TSchema> {
  className?: string;
  max?: number;
}
