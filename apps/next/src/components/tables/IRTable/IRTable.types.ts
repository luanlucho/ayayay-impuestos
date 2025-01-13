// IRTable types and interfaces

import { IRTableRow } from "data/data.types";

// Component Props
export interface IRTableProps {
  className?: string;
  countryCode: string;
  year: number;
  filename: string;
}

export interface IRTableClientProps {
  className?: string;
  data: IRTableRow[];
}
