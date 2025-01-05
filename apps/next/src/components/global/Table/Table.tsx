"use client";
import { useReactTable, flexRender } from "@tanstack/react-table";
import { getCoreRowModel as getCoreRowModelFn } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useMemo, useRef } from "react";
import { twMerge } from "tailwind-merge";

import Count from "./Count/Count";
import { TableProps as Props } from "./Table.types";
import MessageBoundary from "../MessageBoundary/MessageBoundary";
import Pagination from "../Pagination/Pagination";
import TableFilters from "./actions/TableFilters/TableFilters";
import TableRowActions from "./columns/TableRowActions/TableRowActions";
import TableRowCurrency from "./columns/TableRowCurrency/TableRowCurrency";
import TableRowDate from "./columns/TableRowDate/TableRowDate";
import TableRowStatus from "./columns/TableRowStatus/TableRowStatus";
import { Button } from "ui/button";
import { TableHead, TableHeader, TableRow } from "ui/table";
import { Table as TableRoot, TableBody, TableCell } from "ui/table";

const Table = <TData, TValue>(props: Props<TData, TValue>) => {
  const { className, columns, data, status, pagination, noResults } = props;
  const { estimatedRowHeight = 65, estimatedHeaderHeight = 48 } = props;
  const { filters } = props;
  const getCoreRowModel = getCoreRowModelFn();
  const selectedData = useMemo(() => data ?? [], [data]);
  const table = useReactTable({ data: selectedData, columns, getCoreRowModel });
  const parentRef = useRef<HTMLDivElement>(null);
  const rows = table.getRowModel().rows;
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedRowHeight,
    overscan: 20
  });
  const tableHeight = `${virtualizer.getTotalSize() + estimatedHeaderHeight}px`;
  const hasActions = !!filters;

  const renderTable = () => {
    if (status === "loading") return <div>Loading...</div>;
    if (status === "error") {
      const normalMessage = "The request failed. Please try again.";
      const filterMessage = "The request failed, try clearing the filters.";
      return (
        <MessageBoundary
          title="Error"
          description={filters ? filterMessage : normalMessage}
          button={
            filters ? (
              <Button
                className="mt-6 w-full !font-semibold"
                onClick={() => filters.clearFilters()}
              >
                Clear filters
              </Button>
            ) : null
          }
        />
      );
    }
    return (
      <div
        ref={parentRef}
        className={twMerge(
          "Table overflow-auto rounded-md border [&_td:has(.fixed-col)]:w-0",
          className
        )}
      >
        <TableRoot
          wrapperClassName="overflow-y-hidden"
          wrapperStyle={rows.length ? { height: tableHeight } : undefined}
        >
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup.id}
                className="bg-primary hover:bg-primary"
              >
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-xs font-semibold text-black md:text-base"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows?.length ? (
              virtualizer.getVirtualItems().map((virtualRow, index) => {
                const row = rows[virtualRow.index]!;
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${
                        virtualRow.start - index * virtualRow.size
                      }px)`
                    }}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {noResults ?? "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableRoot>
      </div>
    );
  };

  return (
    <div className={twMerge("TableWrapper flex flex-1 flex-col gap-4")}>
      {hasActions ? (
        <div className="flex items-center gap-2 self-start rounded-md border">
          <TableFilters values={filters} />
        </div>
      ) : null}
      {renderTable()}
      <div className="relative flex flex-1 items-end">
        {pagination ? <Pagination {...pagination} /> : null}
        {pagination ? <Count {...pagination} /> : null}
      </div>
    </div>
  );
};

Table.RowActions = TableRowActions;
Table.RowDate = TableRowDate;
Table.RowCurrency = TableRowCurrency;
Table.RowStatus = TableRowStatus;

export default Table;
