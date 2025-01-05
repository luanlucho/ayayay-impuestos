// Project constants

export const CONSTANTS = {
  MARKETING_URL: "https://www.ayayayimpuestos.com",
  DASHBOARD_URL: "https://ayayayimpuestos.com",
  SUPPORTED_COUNTRIES: [{ name: "Ecuador", code: "ec", years: [2024] }],
  ACCOUNT_ID_COOKIE_NAME: "ir:account_id",
  MAX_CONDITIONS: 5,
  MAX_COMPOUNDED_CONDITIONS: 5,
  MAX_RULES: 10,
  MAX_TEMPLATE_INPUTS: 50,
  MAX_TIERS: 10,
  MAX_COUPON_CODES: 9_999,
  MAX_COUPON_BENEFITS: 10,
  MAX_GIFT_CARD_CODES: 1_000,
  MAX_PURCHASE_PRODUCTS: 10_000,
  MAX_PAGE_SIZE: 100,
  // 1 Nano
  MIN_NUMBER: 0.0001,
  // 1 Billion - 1
  MAX_NUMBER: 999_999_999,
  MAX_INT2: 32_767,
  DATE_FORMAT: "YYYY-MM-DD",
  DATE_TIME_FORMAT: "MMM DD YYYY - HH:mm:ss",
  DATE_TIME_LOG_FORMAT: "YYYY MMM DD - HH:mm:ss",
  DATE_TIME_LOG_SHORT_FORMAT: "MMM DD - HH:mm:ss",
  RESERVED_EVENTS: [
    "CANCEL",
    "REVERSE",
    "PURCHASE",
    "TIER_ADJUSTMENT",
    "REGISTRATION"
  ],
  PROTECTED_EVENTS: ["CANCEL", "REVERSE", "TIER_ADJUSTMENT", "REGISTRATION"],
  FAKE_ID: "00000000-0000-0000-0000-000000000000",
  CRON_BATCH_SIZE: 500
};
