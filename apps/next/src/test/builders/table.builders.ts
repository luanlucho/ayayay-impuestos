// Table builders

import { TableFiltersValues } from "components/global/Table/Table.types";

export const buildTableFilterValues = (
  overrides: Partial<TableFiltersValues> = {}
): TableFiltersValues => {
  return {
    filters: [],
    columns: [],
    applyFilters: () => {},
    removeFilter: () => {},
    clearFilters: () => {},
    getAppliedFilters: () => [],
    ...overrides
  };
};
