// Events builder functions
import { faker } from "@faker-js/faker";
import { Tables } from "@repo/types";

import { GenCount } from "./types";

export const buildEvent = (
  overrides: Partial<
    Omit<Tables<"events">, "status" | "data" | "result" | "rewarding_campaigns">
  > & {
    status?: "PENDING" | "PROCESSING" | "FAILED" | "RESOLVED";
    data?: Record<string, unknown> & {
      customer_id: string;
      brand_id: string | null;
    };
    result?: Record<string, unknown> | string | null;
  } = {}
) => {
  return {
    id: faker.string.uuid(),
    issued_at: faker.date.past().toISOString(),
    processing_at: faker.date.past().toISOString(),
    resolved_at: faker.date.past().toISOString(),
    fulfilled_at: null,
    cancelled_at: null,
    reversed_at: null,
    account_id: faker.string.uuid(),
    customer_id: faker.string.uuid(),
    rewarding_campaigns: [],
    data: { customer_id: "1", brand_id: "1" },
    fulfilled: true,
    type: "PURCHASE",
    result: null,
    reserve: null,
    queue_message_id: null,
    status: "RESOLVED" as const,
    ...overrides
  };
};

export const genEvents = (count: GenCount = { min: 1, max: 10 }) => {
  return faker.helpers.multiple(buildEvent, { count });
};
