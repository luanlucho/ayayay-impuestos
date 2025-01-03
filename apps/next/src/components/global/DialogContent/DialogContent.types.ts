// DialogContent types and interfaces
import { Content } from "@radix-ui/react-dialog";

// Component Props
export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof Content> {
  className?: string;
  children: React.ReactNode;
  hideCloseButton?: boolean;
  onCloseClick?: () => void;
  onClose?: () => void;
}
