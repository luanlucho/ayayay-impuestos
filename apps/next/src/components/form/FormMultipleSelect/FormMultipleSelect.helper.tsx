import { twMerge } from "tailwind-merge";

import { SelectType } from "./FormMultipleSelect.types";

export const getClassNames = (
  // MultiValue props does not expose types correctly
  state: any,
  type: SelectType
) => {
  switch (type) {
    case "control":
      return twMerge(
        "!bg-background !border-border [&>*:last-child>*:first-child]:opacity-40",
        state.isFocused ? "!shadow-none" : "",
        state.isDisabled ? "cursor-not-allowed opacity-50" : ""
      );
    case "option":
      return twMerge(
        "relative rounded-sm px-2 py-1.5 !text-sm outline-none",
        state.isFocused ? "hover:!bg-accent !bg-background" : "!bg-background"
      );
    case "menu":
      return "!bg-background";
    case "placeholder":
      return "!text-muted-foreground ml-[0.2rem] text-sm";
    case "multiValue":
      return "!bg-background-2 text-primary hover:[&>*:last-child]:bg-red-800/10 hover:[&>*:last-child]:text-red-700";
    case "multiValueLabel":
      return "!text-muted-foreground";
    case "input":
      return "!text-muted-foreground";
    default:
      return "";
  }
};
