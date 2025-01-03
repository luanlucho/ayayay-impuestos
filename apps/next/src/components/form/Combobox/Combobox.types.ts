// Combobox types and interfaces
import { Command } from "cmdk";

// Component Props
export interface ComboboxProps
  extends React.ComponentPropsWithoutRef<typeof Command> {
  className?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  notFoundMessage?: string;
  items: ComboboxItem[];
  onItemSelect?: (item: ComboboxItem | undefined) => void;
  onValueChange?: (value: string) => void;
  onSearchValueChange?: (value: string) => void;
  disabled?: boolean;
  value?: string;
}

export interface ComboboxItem {
  value: string;
  label: string;
}
