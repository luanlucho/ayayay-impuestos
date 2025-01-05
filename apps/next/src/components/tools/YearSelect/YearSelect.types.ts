// YearSelect types and interfaces

import { SelectProps } from "@radix-ui/react-select";

// Component Props
export interface YearSelectProps extends SelectProps {
  className?: string;
  contentClassName?: string;
  countryCode: string;
}
