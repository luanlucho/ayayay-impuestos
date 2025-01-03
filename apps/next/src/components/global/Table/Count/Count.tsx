import React from "react";
import { twMerge } from "tailwind-merge";

import { CountProps as Props } from "./Count.types";

const Count = (props: Props) => {
  const { className, count, page, size } = props;
  if (!count) return null;
  const from = (page - 1) * size + 1;
  const to = Math.min(page * size, count);
  const numberFormatter = new Intl.NumberFormat("en-US");
  const total = numberFormatter.format(count);

  return (
    <div
      className={twMerge(
        "Count absolute bottom-0 right-0 px-8 py-2",
        className
      )}
    >
      <p className="text-muted-foreground text-nowrap text-sm leading-6">
        Results {from} - {to} of {total}
      </p>
    </div>
  );
};

export default Count;
