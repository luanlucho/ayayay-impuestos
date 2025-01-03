// Sign out custom hook functions

import { useGlobalsStore } from "stores/globals/globals.store";

const useReset = () => {
  const resetGlobals = useGlobalsStore(state => state.reset);

  return async () => {
    await fetch("/api/cookies/account", { method: "DELETE" });
    resetGlobals();
  };
};

export default useReset;
