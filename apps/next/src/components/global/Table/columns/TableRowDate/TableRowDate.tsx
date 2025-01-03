import dayjs from "dayjs";
import invariant from "invariant";
import React from "react";
import { twMerge } from "tailwind-merge";

import { TableRowDateProps as Props } from "./TableRowDate.types";
import CONSTANTS from "config/constants";

const TableRowDate = (props: Props) => {
  const { className, date, format = "DATE" } = props;
  const valid = dayjs(date).isValid();
  const formatString = CONSTANTS[`${format}_FORMAT`];
  invariant(formatString, `Invalid format: ${format}`);

  if (!valid || !date) {
    return <div className={twMerge("px-[4ch]", className)}>-</div>;
  }

  return (
    <time className={twMerge("TableRowDate", className)} dateTime={date}>
      {dayjs(date).format(formatString)}
    </time>
  );
};

export default TableRowDate;
