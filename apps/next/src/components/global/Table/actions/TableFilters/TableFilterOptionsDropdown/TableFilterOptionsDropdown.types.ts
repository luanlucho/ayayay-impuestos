// TableFilterOptionsDropdown types and interfaces
import { TableFiltersColumn } from "components/global/Table/Table.types";

// Component Props
export interface TableFilterOptionsDropdownProps {
  className?: string;
  options: TableFiltersColumn[];
  onSelect: (option: TableFiltersColumn) => void;
}
