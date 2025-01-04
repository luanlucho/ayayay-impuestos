import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export const createMiddlewareClient = async (
  request: NextRequest,
  response: NextResponse
) => {
  return createServerClient(
    // @ts-expect-error
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        // @ts-expect-error
        setAll(cookiesToSet) {
          // @ts-expect-error
          cookiesToSet.forEach(params => {
            const { name, value } = params;
            return request.cookies.set(name, value);
          });
          // @ts-expect-error
          cookiesToSet.forEach(params => {
            const { name, value, options } = params;
            return response.cookies.set(name, value, options);
          });
        }
      }
    }
  );
};
