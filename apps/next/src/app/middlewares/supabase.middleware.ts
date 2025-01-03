// Supabase middleware
import { NextRequest, NextResponse } from "next/server";

import { handleMiddleware } from "./utils.middleware";
import { createMiddlewareClient } from "utils/supabase/supabase.middleware";

export const supabaseMiddleware = (req: NextRequest) => {
  return handleMiddleware(req, async (req, res) => {
    // Refresh auth session cookie
    const supabase = await createMiddlewareClient(req, res);
    const { data } = await supabase.auth.getUser();
    const atSignInRoute = req.nextUrl.pathname.startsWith("/auth/signin");
    const atAPIRoute = req.nextUrl.pathname.startsWith("/api");
    const redirectToSignIn = !data.user && !atSignInRoute && !atAPIRoute;
    const noAuthURL = new URL("/auth/signin", req.url);
    if (redirectToSignIn) return NextResponse.redirect(noAuthURL);
    return res;
  });
};
