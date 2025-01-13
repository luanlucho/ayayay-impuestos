// FeriadosProvicialesTable types and interfaces

import { FeriadosProvicialesTableRow } from "data/data.types";

// Component Props
export interface FeriadosProvicialesTableProps {
  className?: string;
  countryCode: string;
  year: number;
  filename: string;
}

export interface FeriadosProvicialesTableClientProps {
  className?: string;
  data: FeriadosProvicialesTableRow[];
}
