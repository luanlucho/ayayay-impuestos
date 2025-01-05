import invariant from "invariant";
import React from "react";

import IRTableClient from "./IRTable.client";
import { IRTableProps as Props } from "./IRTable.types";
import { TableRow } from "data/data.types";

const IRTable = async (props: Props) => {
  const { className, countryCode, year, filename } = props;
  const modules = await import(`data/${countryCode}/${year}/${filename}`);
  const data: TableRow[] = modules.table;
  invariant(Array.isArray(data), "Data must be an array");

  return <IRTableClient className={className} data={data} />;
};

export default IRTable;
