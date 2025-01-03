import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";

import { createContext } from "./trpc.context";
import { createServerClient } from "utils/supabase/supabase.server";

const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();

const setSupabaseMiddleWare = t.middleware(async options => {
  const { next } = options;
  const supabase = await createServerClient();
  return next({ ctx: { supabase } });
});

const isDashboardUserMiddleware = t.middleware(async options => {
  const { next, path: message } = options;
  const supabase = await createServerClient();

  const res = await supabase.auth.getUser();
  const { user } = res.data;
  const cause = "Invalid session";
  const unauthorized = new TRPCError({ code: "UNAUTHORIZED", cause, message });
  if (!user) throw unauthorized;
  return next({ ctx: { user } });
});

export const router = t.router;
export const mergeRouters = t.mergeRouters;

// Doesn't require authentication or authorization
export const publicProcedure = t.procedure.use(setSupabaseMiddleWare);
// Only Dashboard users can access this procedure
export const userProcedure = publicProcedure.use(isDashboardUserMiddleware);
