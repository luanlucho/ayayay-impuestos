"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

import { columns } from "./IRTable.helpers";
import { IRTableClientProps as Props } from "./IRTable.types";
import Table from "components/global/Table/Table";

const IRTableClient = (props: Props) => {
  const { className, data } = props;

  return (
    <>
      <button onClick={() => window.print()}>Test</button>
      <Table
        className={twMerge("IRTable", className)}
        columns={columns}
        data={data}
        status="success"
      />
    </>
  );
};

export default IRTableClient;
