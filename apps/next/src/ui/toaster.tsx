"use client";
import { CheckCircle2, Info, XCircle, RefreshCcw } from "lucide-react";

import { cn } from "./utils";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "ui/../ui/toast";
import { useToast } from "ui/../ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  const renderIcon = (variant: string | undefined | null) => {
    if (variant === "info") {
      return <Info className="min-h-[20px] min-w-[20px] stroke-blue-500" />;
    }
    if (variant === "success") {
      return (
        <CheckCircle2 className="min-h-[20px] min-w-[20px] stroke-green-500" />
      );
    }
    if (variant === "error") {
      return <XCircle className="min-h-[20px] min-w-[20px] stroke-red-500" />;
    }
    if (variant === "realtime") {
      return (
        <RefreshCcw
          width={20}
          height={20}
          className="min-h-[20px] min-w-[20px] stroke-green-500"
        />
      );
    }
    return null;
  };

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        className,
        ...props
      }) {
        return (
          <Toast key={id} {...props} className={cn("justify-start", className)}>
            {renderIcon(props.variant)}
            <div className="grid flex-1 gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
