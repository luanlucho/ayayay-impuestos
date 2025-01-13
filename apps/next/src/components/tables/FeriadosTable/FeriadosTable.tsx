import dayjs from "dayjs";
import invariant from "invariant";
import React from "react";

import FeriadosTableClient from "./FeriadosTable.client";
import { FeriadosTableProps as Props } from "./FeriadosTable.types";
import { FeriadosTableRow } from "data/data.types";

const FeriadosTable = async (props: Props) => {
  const { className, countryCode, year, filename } = props;
  const modules = await import(`data/${countryCode}/${year}/${filename}`);
  const data: FeriadosTableRow[] = modules.table;
  invariant(Array.isArray(data), "Data must be an array");

  const nextHoliday = data.find(row => {
    const isAfter = dayjs(row.date, "YYYY-MM-DD").isAfter(dayjs(), "day");
    const isToday = dayjs(row.date, "YYYY-MM-DD").isSame(dayjs(), "day");
    return isAfter || isToday;
  });

  const enhancedData = data.map(row => {
    const highlighted = nextHoliday && row.date === nextHoliday.date;
    return { ...row, highlighted };
  });

  return <FeriadosTableClient className={className} data={enhancedData} />;
};

export default FeriadosTable;
