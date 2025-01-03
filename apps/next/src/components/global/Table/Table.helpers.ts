// Table helper functions
import { QueryStatus } from "@tanstack/react-query";

export const getTableStatus = (
  countStatus: QueryStatus,
  queryStatus: QueryStatus
) => {
  if (countStatus === "error" || queryStatus === "error") return "error";
  if (countStatus === "loading" || queryStatus === "loading") return "loading";
  return "success";
};
