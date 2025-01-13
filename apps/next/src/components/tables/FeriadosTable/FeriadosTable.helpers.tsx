// FeriadosTable helper functions and data
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import Table from "components/global/Table/Table";
import { FeriadosTableRow } from "data/data.types";

export const columns: ColumnDef<FeriadosTableRow>[] = [
  {
    accessorKey: "date",
    header: "Fecha",
    cell: props => {
      dayjs.locale("es");
      const { date } = props.row.original;
      return (
        <Table.RowDate
          date={date}
          format="MONTH_DAY_LONG"
          className="block min-w-[108px]"
        />
      );
    }
  },
  {
    accessorKey: "name",
    header: "Festividad",
    cell: props => {
      const { name } = props.row.original;
      return <span className="block min-w-[108px]">{name}</span>;
    }
  },
  {
    header: "Faltan (días)",
    cell: props => {
      const { date } = props.row.original;
      const daysAway = dayjs(date).diff(dayjs(), "day");
      const classNames = "block text-nowrap text-muted-foreground";
      if (daysAway < 0) {
        return <span className={classNames}>Ya pasó 📆</span>;
      }
      if (daysAway === 0) {
        return <span className={classNames}>Es hoy, es hoy 🎉</span>;
      }
      return <span className={classNames}>Faltan {daysAway} días</span>;
    }
  },
  {
    accessorKey: "original_date",
    header: "Fecha original",
    cell: props => {
      const { original_date } = props.row.original;
      return (
        <Table.RowDate
          date={original_date}
          format="MONTH_DAY"
          className="text-muted-foreground block min-w-[108px]"
        />
      );
    }
  }
];
