// FormEmptyInput types and interfaces

import { ComponentProps } from "react";
import { FieldValues } from "react-hook-form";

import { FormFieldProps } from "types/form.types";

// Component Props
export interface FormEmptyInputProps<TSchema extends FieldValues>
  extends FormFieldProps<TSchema>,
    Omit<ComponentProps<"input">, "name" | "defaultChecked" | "defaultValue"> {
  href: string;
  title: string;
}
