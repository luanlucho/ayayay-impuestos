import { Tables } from "./database.types";

// Customer types and interfaces
export interface CustomerMetricsByPeriod {
  from: string;
  to: string;
  tier_id: string | null;
  spend_total: number;
  number_of_purchases: number;
  last_visit?: string | null;
}

export interface CustomerMetrics {
  this_month: CustomerMetricsByPeriod | null;
  last_month: CustomerMetricsByPeriod | null;
  this_quarter: CustomerMetricsByPeriod | null;
  last_quarter: CustomerMetricsByPeriod | null;
  this_year: CustomerMetricsByPeriod | null;
  last_year: CustomerMetricsByPeriod | null;
  total_purchases?: number | null;
  updated_at: string | null;
}

export interface Customer
  extends Omit<Tables<"customers">, "metrics" | "gender"> {
  metrics: CustomerMetrics;
  gender: "MALE" | "FEMALE" | null;
}

export interface CustomerWithTier extends Customer {
  tier_id: Tables<"tiers">["id"];
}
