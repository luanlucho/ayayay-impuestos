// Sign out custom hook functions
import { useRouter } from "next/navigation";

import useReset from "./useReset";
import { createBrowserClient } from "utils/supabase/supabase.client";

const useSignOut = () => {
  const router = useRouter();
  const reset = useReset();
  const supabase = createBrowserClient();

  return async () => {
    await supabase.auth.signOut();
    await reset();
    router.push("/auth/signin");
  };
};

export default useSignOut;
