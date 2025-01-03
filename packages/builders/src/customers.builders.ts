// Customers builder functions
import { faker } from "@faker-js/faker";
import { CustomerMetrics, Customer, CustomerWithTier } from "@repo/types";
import { CustomerMetricsByPeriod } from "@repo/types";
import dayjs, { Dayjs } from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

import { GenCount } from "./types";

dayjs.extend(quarterOfYear);

export const buildMetrics = (
  overrides: Partial<CustomerMetrics> = {},
  fixed = false
): CustomerMetrics => {
  const index = fixed ? 0 : Math.random();
  const number_of_purchases = faker.number.int({ min: 1, max: 300 });
  return {
    this_month: index > 0.3 ? buildMetricsByPeriod() : null,
    last_month: index > 0.4 ? buildMetricsByPeriod() : null,
    this_quarter: index > 0.5 ? buildMetricsByPeriod() : null,
    last_quarter: index > 0.6 ? buildMetricsByPeriod() : null,
    this_year: index > 0.7 ? buildMetricsByPeriod() : null,
    last_year: index > 0.8 ? buildMetricsByPeriod() : null,
    updated_at: index > 0.1 ? faker.date.past().toISOString() : null,
    total_purchases: index > 0.9 ? number_of_purchases : null,
    ...overrides
  };
};

export const buildMetricsByPeriod = (
  overrides: Partial<
    CustomerMetricsByPeriod & {
      period: "month" | "quarter" | "year";
      prev: boolean;
      currentDate: Dayjs;
    }
  > = {}
): CustomerMetricsByPeriod => {
  const fixed = !!overrides.period;
  const { period = "month", prev, currentDate, ...rest } = overrides;
  const amount = prev ? 1 : 0;
  const now = currentDate ?? dayjs();
  const relativeDate = now.subtract(amount, period);
  const from = relativeDate.startOf(period).toISOString();
  const to = relativeDate.endOf(period).toISOString();
  const spendTotal = faker.number.float({ min: 3, max: 100, multipleOf: 0.01 });
  const purchases = faker.number.float({ min: 0.1, max: 366, multipleOf: 0.1 });
  return {
    from,
    to,
    tier_id: faker.string.uuid(),
    spend_total: fixed ? 0 : spendTotal,
    number_of_purchases: fixed ? 0 : purchases,
    last_visit: fixed ? null : faker.date.past().toISOString(),
    ...rest
  };
};

export const buildCustomer = (
  overrides: Partial<Customer> = {},
  fixed = false
): Customer => {
  const yearsAgo = faker.number.int({ min: 10, max: 80 });
  const dob = faker.date.past({ years: yearsAgo }).toISOString();
  return {
    id: faker.string.uuid(),
    account_id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    dob: faker.helpers.arrayElement([dob, null]),
    gender: faker.helpers.arrayElement(["MALE", "FEMALE", null]),
    metrics: buildMetrics({}, fixed),
    metadata: {},
    registration_date: faker.date.past().toISOString(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    deleted_at: null,
    status: "ACTIVE",
    test: false,
    ...overrides
  };
};

export const genCustomers = (count: GenCount = { min: 1, max: 10 }) => {
  return faker.helpers.multiple(buildCustomer, { count });
};

export const buildCustomerWithTier = (
  overrides: Partial<CustomerWithTier> = {},
  fixed = false
): CustomerWithTier => {
  return {
    tier_id: faker.string.uuid(),
    ...buildCustomer(overrides, fixed)
  };
};
