// Table types and interfaces
import { ColumnDef } from "@tanstack/react-table";

// Component Props
export interface TableProps<TData, TValue> {
  className?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | undefined;
  status: "loading" | "error" | "success" | "idle";
  pagination?: TablePaginationValues;
  noResults?: React.ReactNode;
  estimatedRowHeight?: number;
  estimatedHeaderHeight?: number;
  filters?: TableFiltersValues;
}

export interface TablePaginationValues {
  count: number | undefined;
  page: number;
  size: number;
  from: number;
  to: number;
  onPageChange?: (newPage: number, size: number) => void;
  onSizeChange?: (newPageSize: number) => void;
}

export type TableFiltersType = "text" | "boolean" | "select";

export interface TableFiltersFilter {
  label: string;
  value: string;
  type?: TableFiltersType;
  options?: string[];
}

export type TableFiltersFilterWithOperator = TableFiltersFilter & {
  operator: string;
};

export type TableFiltersAppliedFilter = Pick<
  TableFiltersFilter,
  "label" | "value"
> & {
  operator: string;
};

export type TableFiltersColumn = Omit<TableFiltersFilter, "value">;

export interface TableFiltersValues {
  filters: TableFiltersFilter[];
  columns: TableFiltersColumn[];
  applyFilters: (filters: TableFiltersFilterWithOperator[]) => void;
  removeFilter: (label: string) => void;
  clearFilters: () => void;
  getAppliedFilters: () => TableFiltersAppliedFilter[];
}
