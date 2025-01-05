// Common utility functions
import invariant from "invariant";

export const numberRegex = /[^0-9.]*/g;

export const unformatNumber = (value: string | number) => {
  const allowedType = typeof value === "string" || typeof value === "number";
  invariant(allowedType, `Value must be a string ${value}`);
  const sanitizedValue = value.toString();
  return parseFloat(sanitizedValue.replace(numberRegex, ""));
};

export const getDomainURL = (path: string) => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000";
  const isVercelProd = process?.env?.NEXT_PUBLIC_VERCEL_ENV === "production";
  if (isVercelProd) url = process?.env?.NEXT_PUBLIC_APP_URL;
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  return url + path;
};

export const formatNumber = (
  rawNumber: number,
  options: Intl.NumberFormatOptions = {},
  decimals?: number
) => {
  const fixedDecimals = decimals;
  const { style = "decimal" } = options;

  let notation = options.notation ?? "standard";
  if (style === "percent") notation = "standard";
  const hasDecimals = rawNumber % 1 !== 0;
  let number = rawNumber;
  if (style === "percent") number = rawNumber / 100;

  if (style === "unit") decimals = 0;
  if (style === "decimal") decimals = hasDecimals ? 2 : 0;
  if (style === "percent") decimals = hasDecimals ? 1 : 0;
  if (style === "currency") decimals = undefined;
  if (notation === "compact" && hasDecimals) decimals = 1;
  if (typeof fixedDecimals === "number") decimals = fixedDecimals;

  const formatter = new Intl.NumberFormat("en-US", {
    style,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    ...options,
    notation
  });
  const toValue = () => formatter.format(number);
  const toParts = () => formatter.formatToParts(number);
  return { toValue, toParts };
};
