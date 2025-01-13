"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

import { columns } from "./FeriadosProvincialesTable.helpers";
import { FeriadosProvicialesTableClientProps as Props } from "./FeriadosProvincialesTable.types";
import Table from "components/global/Table/Table";

const FeriadosProvicialesTableClient = (props: Props) => {
  const { className, data } = props;

  return (
    <Table
      className={twMerge("FeriadosProvicialesTable", className)}
      columns={columns}
      data={data}
      status="success"
    />
  );
};

export default FeriadosProvicialesTableClient;
