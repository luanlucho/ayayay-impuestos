// FormTextarea types and interfaces

import { ComponentProps } from "react";
import { FieldValues } from "react-hook-form";

import { FormFieldProps } from "types/form.types";

// Component Props
export interface FormTextareaProps<TSchema extends FieldValues>
  extends FormFieldProps<TSchema>,
    Omit<
      ComponentProps<"textarea">,
      "name" | "defaultChecked" | "defaultValue"
    > {}
