// Common middleware
import { geolocation } from "@vercel/functions";
import invariant from "invariant";
import { NextRequest, NextResponse } from "next/server";

import { handleMiddleware } from "./utils.middleware";
import CONSTANTS from "config/constants";

export const redirectMiddleware = (req: NextRequest) => {
  return handleMiddleware(req, async (req, res) => {
    const countries = CONSTANTS.SUPPORTED_COUNTRIES;
    const segments = req.nextUrl.pathname.split("/");
    const pathCountryCode = segments[1];
    const pathYear = segments[2];
    let defaultCountry = countries[0];
    const preferredCountry = geolocation(req).country;
    const validPreferredCountry = countries.find(
      c => c.code === preferredCountry
    );
    if (validPreferredCountry) defaultCountry = validPreferredCountry;
    invariant(defaultCountry, "Default country not found");

    const defaultCode = defaultCountry.code;
    invariant(defaultCode, "Default code not found");
    const validPreferredYear = defaultCountry.years.find(
      y => y === Number(pathYear)
    );
    let defaultYear = defaultCountry.years[0];
    if (validPreferredYear) defaultYear = validPreferredYear;
    invariant(defaultYear, "Default year not found");
    // Check if url is valid
    const validCountryCode = countries.find(c => c.code === pathCountryCode);
    if (!validCountryCode) {
      const url = new URL(`/${defaultCode}/${defaultYear}`, req.url);
      return NextResponse.redirect(url);
    }
    const validYear = validCountryCode.years.find(y => y === Number(pathYear));
    if (!validYear) {
      const fallbackYear = validCountryCode.years[0];
      const url = new URL(`/${pathCountryCode}/${fallbackYear}`, req.url);
      return NextResponse.redirect(url);
    }
    return res;
  });
};
