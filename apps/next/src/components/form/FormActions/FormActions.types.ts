// FormActions types and interfaces

import { ConfirmationModalProps } from "components/global/ConfirmationModal/ConfirmationModal.types";

// Component Props
export interface FormActionsProps {
  className?: string;
  formName: string;
  confirmation?: FormActionsConfirmation;
}

export interface FormActionsConfirmation
  extends Pick<ConfirmationModalProps, "title" | "description"> {}
