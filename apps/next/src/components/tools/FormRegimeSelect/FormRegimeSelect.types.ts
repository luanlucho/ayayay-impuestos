// FormRegimeSelect types and interfaces

import { FieldValues } from "react-hook-form";

import { FormSelectProps } from "components/form/FormSelect/FormSelect.types";

// Component Props
export interface FormRegimeSelectProps<TSchema extends FieldValues>
  extends FormSelectProps<TSchema> {
  className?: string;
}
