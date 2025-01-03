// FormCombobox types and interfaces
import { Command } from "cmdk";
import { FieldValues } from "react-hook-form";

import { FormFieldProps } from "types/form.types";

// Component Props
export interface FormComboboxProps<TSchema extends FieldValues>
  extends FormFieldProps<TSchema>,
    Omit<
      React.ComponentPropsWithoutRef<typeof Command>,
      "label" | "defaultValue" | "defaultChecked"
    > {
  className?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  notFoundMessage?: string;
  items: ComboboxItem[];
  onItemSelect?: (item: ComboboxItem | undefined) => void;
  onValueChange?: (value: string) => void;
  onSearchValueChange?: (value: string) => void;
  contentClassName?: string;
  disabled?: boolean;
  footerItem?: React.ReactNode;
  onFooterSelect?: () => void;
}

export interface ComboboxItem {
  value: string;
  label: string;
  suffix?: string;
}
