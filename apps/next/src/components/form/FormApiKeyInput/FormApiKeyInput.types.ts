// FormApiKeyInput types and interfaces
import { FieldValues } from "react-hook-form";

import { FormInputProps } from "../FormInput/FormInput.types";

// Component Props
export interface FormApiKeyInputProps<TSchema extends FieldValues>
  extends FormInputProps<TSchema> {
  className?: string;
}
