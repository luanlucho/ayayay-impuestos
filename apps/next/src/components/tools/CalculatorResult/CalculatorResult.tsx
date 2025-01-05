import React from "react";
import { twMerge } from "tailwind-merge";

import { CalculatorResultProps as Props } from "./CalculatorResult.types";
import AnimatedCounter from "components/global/AnimatedCounter/AnimatedCounter";
import MoreInfoTooltip from "components/global/MoreInfoTooltip/MoreInfoTooltip";

const CalculatorResult = (props: Props) => {
  const { className, data } = props;

  if (!data || data.length === 0) return null;
  return (
    <div className={twMerge("CalculatorResult flex flex-col gap-4", className)}>
      <h2 id="result" className="h2 !text-lg">
        Resultado
      </h2>
      <ul className="grid grid-cols-1 gap-2">
        {data.map((item, index) => {
          const { label, value, options, description } = item;
          const isPrimary = options?.style === "primary";
          const isSecondary = options?.style === "secondary";
          return (
            <li
              key={index}
              className={twMerge(
                "grid w-full grid-cols-[1fr,max-content] grid-rows-subgrid items-center justify-between rounded-xl border px-2 py-1 text-sm",
                isPrimary
                  ? "dark:border-primary bg-primary dark:bg-transparent"
                  : ""
              )}
            >
              <span className="flex items-center gap-1">
                <span
                  className={twMerge(
                    "text-muted-foreground",
                    isSecondary ? "text-foreground" : "",
                    isPrimary
                      ? "text-foreground dark:text-primary !text-xs uppercase"
                      : ""
                  )}
                >
                  {label}
                </span>
                <MoreInfoTooltip>{description}</MoreInfoTooltip>
              </span>
              <span
                className={twMerge(
                  "text-muted-foreground min-w-[80px]",
                  isSecondary ? "text-foreground" : "",
                  isPrimary ? "text-foreground dark:text-primary" : ""
                )}
              >
                {typeof value === "number" ? (
                  <AnimatedCounter
                    to={value}
                    formatOptions={{
                      style: "currency"
                    }}
                  />
                ) : (
                  value
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CalculatorResult;
