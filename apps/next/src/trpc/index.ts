import { generalRouter } from "./general.router";
import { router } from "./trpc";

export const appRouter = router({
  general: generalRouter
});

export type AppRouter = typeof appRouter;
