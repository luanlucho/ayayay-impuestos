// TableRowDate types and interfaces

// Component Props
export interface TableRowDateProps {
  className?: string;
  date: string | null;
  format?: "DATE" | "DATE_TIME" | "DATE_TIME_LOG" | "DATE_TIME_LOG_SHORT";
}
