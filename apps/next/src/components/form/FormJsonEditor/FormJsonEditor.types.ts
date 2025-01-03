// FormJsonEditor types and interfaces

import { FieldValues } from "react-hook-form";

import { FormFieldProps } from "types/form.types";

// Component Props
export interface FormJsonEditorProps<TSchema extends FieldValues>
  extends FormFieldProps<TSchema> {}
