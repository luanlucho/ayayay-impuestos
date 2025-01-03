import { router, userProcedure } from "./trpc";

export const generalRouter = router({
  currencies: router({
    select: userProcedure.query(async options => {
      const { supabase } = options.ctx;
      const res = await supabase
        .from("currencies")
        .select("*")
        .eq("status", "ACTIVE")
        .is("deleted_at", null)
        .order("name");
      const { data, error } = res;
      if (error) throw error;
      return data;
    })
  }),
  timezones: router({
    select: userProcedure.query(async options => {
      const { supabase } = options.ctx;
      const res = await supabase
        .from("timezones")
        .select("*")
        .eq("status", "ACTIVE")
        .is("deleted_at", null)
        .order("name");
      const { data, error } = res;
      if (error) throw error;
      return data;
    })
  })
});
