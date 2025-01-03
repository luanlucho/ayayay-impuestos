// Rewards builder functions
import { faker } from "@faker-js/faker";
import { Tables } from "@repo/types";

import { GenCount } from "./types";

export const randomRewardType = () => {
  return faker.helpers.arrayElement([
    "POINTS" as const,
    "DISCOUNT" as const,
    "GIFT_CARD" as const,
    "PRODUCT" as const
  ]);
};

export const buildReward = (
  overrides: Omit<Partial<Tables<"rewards">>, "type"> & {
    type?: "POINTS" | "DISCOUNT" | "GIFT_CARD" | "PRODUCT";
  } = {}
) => {
  const type = randomRewardType();
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    account_id: faker.string.uuid(),
    brand_id: faker.string.uuid(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    deleted_at: null,
    status: "ACTIVE",
    type,
    attributes: "" as any, // since we don't have the reward attributes type in builders
    description: "",
    conditions: [] as any[][], // since we don't have the condition type in builders
    content: {},
    template_id: null,
    ...overrides
  } satisfies Tables<"rewards">;
};

export const genRewards = (count: GenCount = { min: 1, max: 10 }) => {
  return faker.helpers.multiple(buildReward, { count });
};
