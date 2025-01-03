// FormCalendarInput types and interfaces

import { FieldValues } from "react-hook-form";

import { FormFieldProps } from "types/form.types";
import { CalendarProps } from "ui/calendar";

// Component Props
export interface FormCalendarInputProps<TSchema extends FieldValues>
  extends FormFieldProps<TSchema> {
  placeholder?: string;
  disabled?: CalendarProps["disabled"];
  inputDisabled?: boolean;
  fromYear?: CalendarProps["fromYear"];
  toYear?: CalendarProps["toYear"];
  captionLayout?: CalendarProps["captionLayout"];
  today?: CalendarProps["today"];
  onValueChange?: (value: Date | undefined) => void;
  endOfDay?: boolean;
}
