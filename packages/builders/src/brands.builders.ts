// Brands builder functions
import { faker } from "@faker-js/faker";
import { Tables } from "@repo/types";

import { GenCount } from "./types";

export const buildBrand = (
  overrides: Partial<Tables<"brands">> = {}
): Tables<"brands"> => {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    account_id: faker.string.uuid(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    deleted_at: null,
    status: "ACTIVE",
    ...overrides
  };
};

export const genBrands = (count: GenCount = { min: 1, max: 10 }) => {
  return faker.helpers.multiple(buildBrand, { count });
};
