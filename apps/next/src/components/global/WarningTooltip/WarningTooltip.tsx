import { AlertCircle } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

import { WarningTooltipProps as Props } from "./WarningTooltip.types";
import { Tooltip, TooltipContent, TooltipTrigger } from "ui/tooltip";

const WarningTooltip = (props: Props) => {
  const { className, children, hide, message } = props;

  if (hide) return children;
  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild className={twMerge("WarningTooltip", className)}>
        {children}
      </TooltipTrigger>
      <TooltipContent className="ring-1">
        <div className="flex items-center gap-2">
          <AlertCircle className="stroke-muted-foreground" />
          <p className="text-muted-foreground max-w-[30ch] flex-1">{message}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default WarningTooltip;
