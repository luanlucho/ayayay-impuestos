// FormStatusSelect types and interfaces

import { FieldValues } from "react-hook-form";

import { FormSelectProps } from "../FormSelect/FormSelect.types";

// Component Props
export interface FormStatusSelectProps<TSchema extends FieldValues>
  extends FormSelectProps<TSchema> {
  className?: string;
  statuses: string[] | StatusOption[];
}

export interface StatusOption {
  label: string;
  value: string;
}
