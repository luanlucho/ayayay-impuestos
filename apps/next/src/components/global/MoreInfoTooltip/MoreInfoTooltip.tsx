import { Info } from "lucide-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { MoreInfoTooltipProps as Props } from "./MoreInfoTooltip.types";
import { Tooltip, TooltipContent, TooltipTrigger } from "ui/tooltip";

const MoreInfoTooltip = (props: Props) => {
  const { className, children } = props;
  const [open, setOpen] = useState(false);

  if (!children) return null;
  return (
    <div className={twMerge("MoreInfoTooltip cursor-pointer", className)}>
      <Tooltip delayDuration={500} open={open} onOpenChange={setOpen}>
        <TooltipTrigger
          asChild
          className={twMerge("WarningTooltip", className)}
        >
          <Info
            className="stroke-primary h-4 w-4"
            onClick={() => setOpen(prev => !prev)}
          />
        </TooltipTrigger>
        <TooltipContent className="bg-primary flex max-w-[320px] flex-col gap-1 px-4 py-2 font-normal text-black">
          {children}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default MoreInfoTooltip;
