import { z } from "zod";

export const envVariables = z.object({
  AUTH_SECRET: z.string().min(32),
  CRON_AUTH_SECRET: z.string().min(32),
  NEXT_PUBLIC_APP_URL: z.string(),
  DB_WEBHOOKS_CHECKSUM: z.string(),
  NEXT_PUBLIC_ENV: z.enum(["develop", "production", "test"]),
  NEXT_PUBLIC_SUPABASE_URL: z.string(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  KV_REST_API_READ_ONLY_TOKEN: z.string(),
  KV_REST_API_TOKEN: z.string(),
  KV_REST_API_URL: z.string(),
  KV_URL: z.string(),
  QSTASH_URL: z.string(),
  QSTASH_TOKEN: z.string(),
  QSTASH_CURRENT_SIGNING_KEY: z.string(),
  QSTASH_NEXT_SIGNING_KEY: z.string(),
  ANALYTICS_BACKFILL_TOKEN: z.string()
});

envVariables.parse(process.env);

export const testEnvVariables = z.object({
  NEXT_PUBLIC_TEST_USER_EMAIL: z.string().email(),
  NEXT_PUBLIC_TEST_USER_PASSWORD: z.string().min(4)
});

if (process.env.ENV === "test") testEnvVariables.parse(process.env);
