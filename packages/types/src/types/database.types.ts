import { PostgrestError } from "@supabase/supabase-js";
import { MergeDeep } from "type-fest";

import { CronMessage } from "./cron.types";
import { Database as DatabaseGenerated } from "./generated-database.types";

export type Json = Record<string, any>;

// DB types and overrides
export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        accounts: {
          Row: {
            settings: AccountSettings;
          };
          Insert: {
            settings?: AccountSettings;
          };
          Update: {
            settings?: AccountSettings;
          };
        };
        rewards: {
          Row: {
            conditions: AlternativeConditions;
          };
          Insert: {
            conditions?: AlternativeConditions;
          };
          Update: {
            conditions?: AlternativeConditions;
          };
        };
        transactions: {
          Row: {
            metadata: Record<string, unknown>;
          };
          Insert: {
            metadata?: Record<string, unknown>;
          };
          Update: {
            metadata?: Record<string, unknown>;
          };
        };
        cron_jobs: {
          Row: {
            messages: CronMessage[];
          };
          Insert: {
            messages?: CronMessage[];
          };
          Update: {
            messages?: CronMessage[];
          };
        };
      };
    };
  }
>;

type AlternativeConditions = unknown[][];

export type AccountSettings = {
  campaigns: {
    behavior: {
      queue_id: string | null;
    };
  };
  tiers: {
    grace_period: Enum<"TEMPORAL_INTERVALS"> | "NONE";
  };
  webhooks: {
    url: string;
    events: string[];
  }[];
};

// Table extract type helper
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

// Enum extract type helper
export type Enum<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

// Composite type helper
export type Composite<T extends keyof Database["public"]["CompositeTypes"]> =
  Database["public"]["CompositeTypes"][T];

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> =
  T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
export type DbResultErr = PostgrestError;

export type StorageFile = {
  name: string;
  id?: string;
  bucket_id: string;
  updated_at: string;
  created_at: string;
  publicUrl: string;
  metadata?: Record<string, any>;
};
