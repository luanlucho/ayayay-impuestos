// Globals store types
import { Tables } from "@repo/types";

export type GlobalsStoreValues = {
  selectedAccountId: Tables<"accounts">["id"] | undefined;
  setSelectedAccountId: (id: Tables<"accounts">["id"]) => void;
  selectedBrandId: Tables<"brands">["id"] | undefined;
  setSelectedBrandId: (id: Tables<"brands">["id"]) => void;
  reset: () => void;
};
