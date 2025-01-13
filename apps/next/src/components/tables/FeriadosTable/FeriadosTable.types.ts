// FeriadosTable types and interfaces

import { FeriadosTableRow } from "data/data.types";

// Component Props
export interface FeriadosTableProps {
  className?: string;
  countryCode: string;
  year: number;
  filename: string;
}

export interface FeriadosTableClientProps {
  className?: string;
  data: FeriadosTableRow[];
}
