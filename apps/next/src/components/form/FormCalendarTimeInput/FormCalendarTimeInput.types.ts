// FormCalendarTimeInput types and interfaces

import { FieldValues } from "react-hook-form";

import { FormCalendarInputProps } from "../FormCalendarInput/FormCalendarInput.types";
import { FormFieldProps } from "types/form.types";

// Component Props
export interface FormCalendarTimeInputProps<TSchema extends FieldValues>
  extends FormFieldProps<TSchema>,
    FormCalendarInputProps<TSchema> {
  timeGranularity?: "minutes" | "seconds";
  onValueChange?: (value: Date | undefined) => void;
}
