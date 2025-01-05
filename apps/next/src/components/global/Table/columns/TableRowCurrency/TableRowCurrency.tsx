import React from "react";
import { twMerge } from "tailwind-merge";

import { TableRowCurrencyProps as Props } from "./TableRowCurrency.types";
import { formatByCurrency } from "components/form/FormCurrencyInput/FormCurrencyInput.helpers";

const TableRowCurrency = (props: Props) => {
  const { className, value } = props;

  return (
    <div className={twMerge("TableRowCurrency", className)}>
      {formatByCurrency(value, { currency: "USD" })}
    </div>
  );
};

export default TableRowCurrency;
