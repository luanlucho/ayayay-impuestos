// Common middleware
import { NextRequest } from "next/server";

import { handleMiddleware } from "./utils.middleware";

export const commonMiddleware = (req: NextRequest) => {
  return handleMiddleware(req, async (req, res) => {
    // Enhance response with additional headers
    // Store current request url in a custom header, which you can read later
    res.headers.set("x-pathname", req.nextUrl.pathname);
    res.headers.set("x-url", req.url);
    return res;
  });
};
