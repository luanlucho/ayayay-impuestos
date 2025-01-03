// Globals store helper functions and data
import { StoreInitialValues } from "@repo/types";

import { GlobalsStoreValues } from "./globals.store.types";

export const defaultValues: StoreInitialValues<GlobalsStoreValues> = {
  selectedAccountId: "",
  selectedBrandId: ""
};
