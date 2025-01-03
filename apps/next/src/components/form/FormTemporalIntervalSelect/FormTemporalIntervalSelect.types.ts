// FormTemporalIntervalSelect types and interfaces

import { FieldValues } from "react-hook-form";

import { FormSelectProps } from "../FormSelect/FormSelect.types";

// Component Props
export interface FormTemporalIntervalSelectProps<TSchema extends FieldValues>
  extends FormSelectProps<TSchema> {
  className?: string;
}
