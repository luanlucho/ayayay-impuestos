// Cookies utility functions
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import CONSTANTS from "config/constants";

const { ACCOUNT_ID_COOKIE_NAME } = CONSTANTS;

// This should be use server only!
export const cookie = {
  accountId: async () => {
    // Only to avoid issues in unit testing
    if (process.env.NODE_ENV === "test") return CONSTANTS.FAKE_ID;
    const cookiesList = await cookies();
    const account_id = cookiesList.get(ACCOUNT_ID_COOKIE_NAME)?.value;
    if (!account_id) return redirect("/auth/accounts");
    return account_id;
  }
};
