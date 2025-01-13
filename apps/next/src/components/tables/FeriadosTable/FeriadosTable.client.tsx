"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

import { columns } from "./FeriadosTable.helpers";
import { FeriadosTableClientProps as Props } from "./FeriadosTable.types";
import Table from "components/global/Table/Table";

const FeriadosTableClient = (props: Props) => {
  const { className, data } = props;

  return (
    <Table
      className={twMerge("FeriadosTable", className)}
      columns={columns}
      data={data}
      status="success"
    />
  );
};

export default FeriadosTableClient;
