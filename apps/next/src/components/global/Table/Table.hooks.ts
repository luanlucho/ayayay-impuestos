// Pagination custom hook functions
import invariant from "invariant";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { TableFiltersFilterWithOperator } from "./Table.types";
import { TablePaginationValues, TableFiltersColumn } from "./Table.types";
import { TableFiltersValues } from "./Table.types";

export const useTablePagination = (
  count: number | undefined,
  defaultSize = 10
): TablePaginationValues | undefined => {
  const [shouldUpdateURL, setShouldUpdateURL] = useState(false);
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  // Limit the page size
  const size = (() => {
    const size = parseInt(params.get("size") ?? `${defaultSize}`, 10);
    if (size < 1) return 1;
    return size;
  })();
  // Limit the page number
  const totalPages = Math.max(Math.ceil((count ?? Infinity) / size), 1);
  const page = useMemo(() => {
    const page = parseInt(params.get("page") ?? "1", 10);
    if (page > totalPages) setShouldUpdateURL(true);
    if (page > totalPages) return totalPages;
    if (page < 1) return 1;
    return page;
  }, [params, totalPages]);
  // Calculate the from and to values
  const getFromTo = (page: number, size: number) => {
    const realPage = page - 1;
    const from = realPage * size;
    const to = from + size - 1;
    return { from, to };
  };
  const [from, setFrom] = useState(() => getFromTo(page, size).from);
  const [to, setTo] = useState(() => getFromTo(page, size).to);

  const onPageChange = useCallback((page: number, size: number) => {
    const { from, to } = getFromTo(page, size);
    setFrom(from);
    setTo(to);
  }, []);

  const onSizeChange = useCallback(
    (size: number) => {
      const { from, to } = getFromTo(page, size);
      setFrom(from);
      setTo(to);
    },
    [page]
  );

  // Recalculate from & to if count changes
  useEffect(() => {
    if (!count) return;
    const { from, to } = getFromTo(page, size);
    setFrom(from);
    setTo(to);
  }, [count, page, size]);

  useEffect(() => {
    if (!shouldUpdateURL) return;
    const newParams = new URLSearchParams(params);
    newParams.set("page", totalPages.toString());
    router.replace(`${pathname}?${newParams}`);
    setShouldUpdateURL(false);
  }, [params, pathname, router, totalPages, shouldUpdateURL]);

  return useMemo(() => {
    if (typeof count === "undefined") return undefined;
    return { count, page, size, from, to, onPageChange, onSizeChange };
  }, [count, from, onPageChange, onSizeChange, page, size, to]);
};

export const useTableFilters = (
  columns: TableFiltersColumn[],
  storageKey?: string
): TableFiltersValues => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialized = useRef(false);
  const account_id = "FAKE";
  let key = "";
  if (storageKey) key = `ir-${account_id}-filters-${storageKey}`;

  useEffect(() => {
    if (!key || initialized.current) return;
    if (params.size) return;
    initialized.current = true;
    const storedFilters = localStorage.getItem(key);
    if (!storedFilters) return;
    router.replace(`${pathname}?${storedFilters}`);
  }, [pathname, router, key, params]);

  // Get the initial values from the URLSearchParams
  const filters = useMemo(() => {
    const allParams = Array.from(params.entries());
    const filteredParams = allParams.filter(([key]) => {
      return columns.some(column => column.label === key);
    });
    return filteredParams.map(filter => {
      const [label, fullValue] = filter;
      const [operator = "", rawValue = ""] = fullValue.split(":");
      const column = columns.find(column => column.label === label);
      invariant(column, `Column with label ${label} not found`);
      const { type, options } = column;
      // make text false to falsy value
      const value = type === "boolean" && rawValue === "false" ? "" : rawValue;
      return { label, value, operator, type, options };
    });
  }, [columns, params]);

  const applyFilters = useCallback(
    (filters: TableFiltersFilterWithOperator[]) => {
      const newParams = new URLSearchParams(params);
      const sanitizedFilters = filters.map(filter => {
        // Make falsy value to text false
        const value = !filter.value ? "false" : filter.value;
        if (filter.type === "boolean") return { ...filter, value };
        return filter;
      });
      sanitizedFilters.forEach(filter => {
        const { value, label, operator } = filter;
        const completeValue = value ? `${operator}:${value}` : "";
        if (!value) newParams.delete(label);
        else newParams.set(label, completeValue);
      });
      columns.forEach(option => {
        const inFilters = filters.some(filter => filter.label === option.label);
        if (!inFilters) newParams.delete(option.label);
      });
      if (key) {
        // clean localStorage params before storing new ones
        const lsParams = new URLSearchParams(newParams);
        lsParams.forEach((value, key) => {
          const inColumns = columns.some(col => col.label === key);
          if (!inColumns) lsParams.delete(key);
        });
        // store new params
        localStorage.setItem(key, lsParams.toString());
      }
      router.replace(`${pathname}?${newParams}`);
    },
    [columns, params, pathname, router, key]
  );

  const removeFilter = useCallback(
    (label: string) => {
      const newParams = new URLSearchParams(params);
      newParams.delete(label);
      if (key) {
        // clean localStorage params before storing new ones
        const lsParams = new URLSearchParams(newParams);
        lsParams.forEach((value, key) => {
          const inColumns = columns.some(col => col.label === key);
          if (!inColumns) lsParams.delete(key);
        });
        // store new params
        localStorage.setItem(key, lsParams.toString());
      }
      router.replace(`${pathname}?${newParams}`);
    },
    [params, key, router, pathname, columns]
  );

  const clearFilters = useCallback(() => {
    const newParams = new URLSearchParams(params);
    filters.forEach(filter => {
      newParams.delete(filter.label);
    });
    if (key) localStorage.removeItem(key);
    router.replace(`${pathname}?${newParams}`);
  }, [filters, params, pathname, router, key]);

  const getAppliedFilters = useCallback(() => {
    const validOperators = ["eq", "lt", "gt", "lte", "gte"];
    return filters.filter(filter => {
      const validOperator = validOperators.includes(filter.operator);
      if (!validOperator) return false;
      return !!filter.value;
    });
  }, [filters]);

  return useMemo(() => {
    return {
      filters,
      columns,
      applyFilters,
      removeFilter,
      clearFilters,
      getAppliedFilters
    };
  }, [
    applyFilters,
    clearFilters,
    filters,
    getAppliedFilters,
    columns,
    removeFilter
  ]);
};
