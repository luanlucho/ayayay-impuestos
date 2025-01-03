// WarningTooltip types and interfaces

import { ReactNode } from "react";

// Component Props
export interface WarningTooltipProps {
  className?: string;
  children: ReactNode;
  message: string;
  hide?: boolean;
}
