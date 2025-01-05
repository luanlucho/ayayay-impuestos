import { type NextRequest } from "next/server";

import { commonMiddleware } from "app/middlewares/common.middleware";
import { redirectMiddleware } from "app/middlewares/redirect.middleware";
// import { corsMiddleware } from "app/middlewares/cors.middleware";
// import { ratelimitMiddleware } from "app/middlewares/ratelimit.middleware";
// import { supabaseMiddleware } from "app/middlewares/supabase.middleware";
import { runMiddlewares } from "app/middlewares/utils.middleware";

import "config/env.config";

export async function middleware(req: NextRequest) {
  const common = commonMiddleware(req);
  const redirect = redirectMiddleware(req);
  // const supabase = supabaseMiddleware(req);
  // const ratelimit = ratelimitMiddleware(req);
  // const cors = corsMiddleware(req, { allowOrigin: "*" });

  // const storefrontPath = "/api/storefront";
  // const blacklist = [
  //   "/api/storefront/v1/auth/authorize",
  //   "/api/storefront/v1/accounts/queue",
  //   "/api/storefront/v1/accounts/queue/delete",
  //   "/api/storefront/v1/behavior/events/process",
  //   "/api/storefront/v1/behavior/events/reverse/process"
  // ];
  // const rateLimitOptions = { path: storefrontPath, blacklist };

  // Order of middlewares is important - first to last
  const middlewares = [
    common(),
    redirect()
    // supabase(),
    // ratelimit(rateLimitOptions),
    // cors({ path: storefrontPath })
  ];
  return runMiddlewares(req, middlewares);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"]
};
