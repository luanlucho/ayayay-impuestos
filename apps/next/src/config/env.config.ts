import { z } from "zod";

export const envVariables = z.object({
  NEXT_PUBLIC_ENV: z.enum(["develop", "production", "test"])
});

envVariables.parse(process.env);

export const testEnvVariables = z.object({});

if (process.env.ENV === "test") testEnvVariables.parse(process.env);
