// TableRowDate types and interfaces

// Component Props
export interface TableRowDateProps {
  className?: string;
  date: string | null;
  format?:
    | "MONTH_DAY"
    | "MONTH_DAY_LONG"
    | "DATE"
    | "DATE_LONG"
    | "DATE_TIME"
    | "DATE_TIME_LOG"
    | "DATE_TIME_LOG_SHORT";
}
