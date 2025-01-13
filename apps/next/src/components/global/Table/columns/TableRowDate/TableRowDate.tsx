import dayjs from "dayjs";
import invariant from "invariant";
import React from "react";
import { twMerge } from "tailwind-merge";
import titleCase from "voca/title_case";

import { TableRowDateProps as Props } from "./TableRowDate.types";
import CONSTANTS from "config/constants";
import "dayjs/locale/es";

const TableRowDate = (props: Props) => {
  const { className, date, format = "DATE" } = props;
  dayjs.locale("es");
  const valid = dayjs(date).isValid();
  const formatString = CONSTANTS[`${format}_FORMAT`];
  invariant(formatString, `Invalid format: ${format}`);

  if (!valid || !date) {
    return <div className={twMerge("px-[4ch]", className)}>-</div>;
  }

  let dateString = dayjs(date).format(formatString);

  if (formatString.includes(" [de] ")) {
    dateString = titleCase(dateString).replace(" De ", " de ");
  }

  return (
    <time className={twMerge("TableRowDate", className)} dateTime={date}>
      {dateString}
    </time>
  );
};

export default TableRowDate;
