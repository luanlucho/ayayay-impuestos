import "server-only";
import { createClient } from "@supabase/supabase-js";

/** DANGER!!!!!!!!!!!!!!!!!! SERVER ONLY !!!!!!!!!!!!!!!!!!!!!!!*/
export const createAdminClient = () => {
  if (typeof window !== "undefined") {
    throw new Error("You are about to leak sensitive data");
  }
  return createClient<DB>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    }
  );
};
