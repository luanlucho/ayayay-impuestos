// FormMultipleSelect types and interfaces
import { SelectValueProps } from "@radix-ui/react-select";
import { ReactNode } from "react";
import { FieldValues, Path, PathValue } from "react-hook-form";

import { FormFieldProps } from "types/form.types";

// Component Props
export interface FormMultipleSelectProps<TSchema extends FieldValues>
  extends FormFieldProps<TSchema>,
    Omit<SelectValueProps, "defaultChecked" | "defaultValue"> {
  contentClassName?: string;
  disabled?: boolean;
  options: PathValue<TSchema, Path<TSchema>>;
  onValueChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  notFoundMessage?: string;
  onCreated: (input: string) => void;
  onSearchValueChange?: (value: string) => void;
  footerItem?: ReactNode;
  onFooterSelect?: () => void;
}

export type SelectType =
  | "control"
  | "option"
  | "menu"
  | "placeholder"
  | "multiValue"
  | "multiValueLabel"
  | "input";
