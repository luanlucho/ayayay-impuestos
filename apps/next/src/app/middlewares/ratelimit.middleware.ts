// Ratelimit middleware
import { Ratelimit } from "@upstash/ratelimit";
import { kv as redis } from "@vercel/kv";
import invariant from "invariant";
import { NextRequest } from "next/server";

import { handleMiddleware } from "./utils.middleware";
import { StorefrontResponse } from "utils/http.utils";

const cache = new Map();

export const ratelimitMiddleware = (req: NextRequest) => {
  return handleMiddleware(req, async (req, res) => {
    const commonConfig = { redis, ephemeralCache: cache };
    const isProd = res.headers.get("x-ir-account-type") === "production";
    // 500 / 25 requests from the same account in 10 seconds
    const tokens = isProd ? 500 : 25;
    const ddosProtection = Ratelimit.slidingWindow(tokens, "10s");
    const limiter = new Ratelimit({ ...commonConfig, limiter: ddosProtection });
    const accountId = res.headers.get("x-account-id");
    invariant(accountId, "Missing account id");
    const approval = await limiter.limit(accountId);
    if (approval.success) return res;
    return StorefrontResponse.tooManyRequests();
  });
};
