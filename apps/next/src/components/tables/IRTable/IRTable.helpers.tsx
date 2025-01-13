// CampaignsTable helper functions and data
import { ColumnDef } from "@tanstack/react-table";
import Big from "big.js";

import Table from "components/global/Table/Table";
import { IRTableRow } from "data/data.types";

export const columns: ColumnDef<IRTableRow>[] = [
  {
    accessorKey: "start",
    header: "Limite inferior",
    cell: props => {
      const { start } = props.row.original;
      return <Table.RowCurrency value={start} />;
    }
  },
  {
    accessorKey: "end",
    header: "Limite superior",
    cell: props => {
      const { end } = props.row.original;
      if (end === Number.MAX_SAFE_INTEGER) return "En adelante";
      return <Table.RowCurrency value={end} />;
    }
  },
  {
    accessorKey: "base",
    header: "Impuesto fracción básica",
    cell: props => {
      const { base } = props.row.original;
      return <Table.RowCurrency value={base} />;
    }
  },
  {
    accessorKey: "rate",
    header: "Tipo marginal (%)",
    cell: props => {
      const { rate } = props.row.original;
      return `${Big(rate).times(100).toNumber()}%`;
    }
  }
];
