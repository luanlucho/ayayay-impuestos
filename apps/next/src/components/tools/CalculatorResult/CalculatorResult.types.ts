// CalculatorResult types and interfaces

// Component Props
export interface CalculatorResultProps {
  className?: string;
  data: Array<ResultItem>;
}

export interface ResultItem {
  label: string;
  value: number | string;
  description?: string;
  options?: {
    style: "primary" | "secondary";
  };
}
