// TimePicker types and interfaces

// Component Props
export interface TimePickerProps {
  className?: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  granularity?: "minutes" | "seconds";
}
