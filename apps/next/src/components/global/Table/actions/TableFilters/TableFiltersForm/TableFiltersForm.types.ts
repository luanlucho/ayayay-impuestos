// TableFiltersForm types and interfaces
import { z } from "zod";

import { schema } from "./TableFiltersForm.helpers";
import { TableFiltersValues } from "components/global/Table/Table.types";

// Component Props
export interface TableFiltersFormProps {
  className?: string;
  values: TableFiltersValues;
  onApplying?: (applying: boolean) => void;
}

export type Schema = z.infer<typeof schema>;
