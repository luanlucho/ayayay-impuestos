// Card types and interfaces
import { ReactNode } from "react";

// Component Props
export interface CardProps {
  className?: string;
  icon: ReactNode;
  title: string;
  description: string;
}
