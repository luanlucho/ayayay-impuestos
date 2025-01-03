// Currencies builder functions
import { faker } from "@faker-js/faker";
import { Tables } from "@repo/types";

import { GenCount } from "./types";

export const buildCurrency = (
  overrides: Partial<Tables<"currencies">> = {}
): Tables<"currencies"> => {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    code: faker.finance.currencyCode(),
    symbol: faker.finance.currencySymbol(),
    deleted_at: null,
    status: "ACTIVE",
    ...overrides
  };
};

export const genCurrencies = (count: GenCount = { min: 1, max: 10 }) => {
  return faker.helpers.multiple(buildCurrency, { count });
};
