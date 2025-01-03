// ConfirmationModal types and interfaces
import { ReactNode } from "react";

// Component Props
export interface ConfirmationModalProps {
  className?: string;
  children: ReactNode;
  formName: string;
  title: string;
  description: ReactNode;
  onSubmit?: () => void | Promise<void>;
}
