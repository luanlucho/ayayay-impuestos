// Navigation utility functions

import { User } from "@supabase/supabase-js";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import CONSTANTS from "config/constants";

export const replaceHistorySoft = (url: string) => {
  history.replaceState({ ...history.state, as: url, url: url }, "", url);
};

export const checkAuthRedirection = async (user: User | null) => {
  const { ACCOUNT_ID_COOKIE_NAME } = CONSTANTS;
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";

  // TODO: move to server middleware
  // Authenticated but no account selected
  const accountsPath = "/auth/accounts";
  const cookiesList = await cookies();
  const account_id = cookiesList.get(ACCOUNT_ID_COOKIE_NAME)?.value;
  if (user && !account_id && !pathname.startsWith(accountsPath)) {
    return redirect(accountsPath);
  }
  // Authenticated with account selected
  if (user && account_id && pathname.startsWith("/auth")) {
    return redirect("/");
  }
};
