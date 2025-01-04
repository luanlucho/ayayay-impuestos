// CalculatorForm types and interfaces

import { z } from "zod";

import { schema } from "./CalculatorForm.helpers";

// Component Props
export interface CalculatorFormProps {
  className?: string;
}

export type Schema = z.infer<typeof schema>;

export type Params2024 = Schema;

export interface TableRow {
  start: number;
  end: number;
  base: number;
  rate: number;
}
