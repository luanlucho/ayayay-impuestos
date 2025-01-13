import React from "react";

import FeriadosProvicialesTableClient from "./FeriadosProvincialesTable.client";
import { FeriadosProvicialesTableProps as Props } from "./FeriadosProvincialesTable.types";
import { FeriadosProvicialesTableRow } from "data/data.types";

const FeriadosProvicialesTable = async (props: Props) => {
  const { className, countryCode, year, filename } = props;
  const modules = await import(`data/${countryCode}/${year}/${filename}`);
  const data: FeriadosProvicialesTableRow[] = modules.table;

  return <FeriadosProvicialesTableClient className={className} data={data} />;
};

export default FeriadosProvicialesTable;
