// Globals store
import { create } from "zustand";

import { defaultValues } from "./globals.store.helpers";
import { GlobalsStoreValues } from "./globals.store.types";

export const useGlobalsStore = create<GlobalsStoreValues>()((set, get) => {
  const values: GlobalsStoreValues = {
    ...defaultValues,
    setSelectedAccountId: id => set({ selectedAccountId: id }),
    setSelectedBrandId: id => set({ selectedBrandId: id }),
    reset: () => set({ ...defaultValues })
  };
  return values;
});
