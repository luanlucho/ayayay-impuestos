// CalculatorIREC2024Form types and interfaces

import { z } from "zod";

import { schema } from "./CalculatorIREC2024Form.helpers";

// Component Props
export interface CalculatorIREC2024FormProps {
  className?: string;
}

export type Schema = z.infer<typeof schema>;

export type Params2024 = Schema;
