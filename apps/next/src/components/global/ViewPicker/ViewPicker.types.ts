// ViewPicker types and interfaces

// Component Props
export interface ViewPickerProps {
  className?: string;
  defaultView?: Views;
}

export type Views = "gantt" | "table";
