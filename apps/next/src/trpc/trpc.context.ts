// TRPC context
import { createServerClient } from "utils/supabase/supabase.server";

export const createContext = async () => {
  const supabase = await createServerClient();
  const res = await supabase.auth.getUser();
  const { user } = res.data;

  return { supabase, user };
};

export type TRPCContext = Awaited<ReturnType<typeof createContext>>;
