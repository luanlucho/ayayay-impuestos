import { renderHook } from "@testing-library/react";
import React from "react";

import Table from "./Table";
import { useTableFilters } from "./Table.hooks";
import { TableFiltersType } from "./Table.types";
import { render } from "setupTests";

vi.mock("next/navigation", async () => {
  return {
    usePathname: () => "/campaigns",
    useSearchParams: () => new URLSearchParams("name=eq%3Ae&status=eq%3Atrue"),
    useRouter: () => ({ replace: vi.fn() })
  };
});

describe("Table", () => {
  it("renders with default props", () => {
    render(<Table columns={[]} data={[]} status="success" />);
  });
});

describe("localStorage should save, load and clear filters", () => {
  const nameColumn = { label: "name" };
  const statusColumn = { label: "status", type: "select" as TableFiltersType };
  const columns = [nameColumn, statusColumn];
  const storageKey = "campaigns";

  it("saves filters to localStorage", () => {
    const { result } = renderHook(() => useTableFilters(columns, storageKey));

    const operator = "eq";
    const nameFilter = { label: "name", value: "example", operator };
    const statusFilter = { label: "status", value: "true", operator };
    const filters = [nameFilter, statusFilter];
    result.current.applyFilters(filters);

    const localStorageKeys = Object.keys(localStorage);
    const storedKey = localStorageKeys.find(key => key.includes(storageKey));
    const storedFilters = storedKey ? localStorage.getItem(storedKey) : null;

    expect(storedFilters).not.toBeNull();
    expect(storedFilters).toContain("name=eq%3Aexample&status=eq%3Atrue");
  });

  it("load filters to localStorage", () => {
    const { result } = renderHook(() => useTableFilters(columns, storageKey));
    const filtersValues = result.current.getAppliedFilters();

    const expectedFilters = [
      {
        label: "name",
        value: "e",
        operator: "eq",
        type: undefined,
        options: undefined
      },
      {
        label: "status",
        value: "true",
        operator: "eq",
        type: "select",
        options: undefined
      }
    ];

    expect(filtersValues).toEqual(expectedFilters);
  });

  it("removes a specific filter from localStorage", () => {
    const { result } = renderHook(() => useTableFilters(columns, storageKey));
    result.current.removeFilter("name");

    const localStorageKeys = Object.keys(localStorage);
    const storedKey = localStorageKeys.find(key => key.includes(storageKey));
    const storedFilters = storedKey ? localStorage.getItem(storedKey) : null;

    expect(storedFilters).toContain("status=eq%3Atrue");
  });

  it("clears filters from localStorage", () => {
    const { result } = renderHook(() => useTableFilters(columns, storageKey));
    result.current.clearFilters();

    const localStorageKeys = Object.keys(localStorage);
    const storedKey = localStorageKeys.find(key => key.includes(storageKey));

    expect(storedKey).toBe(undefined);
  });
});
