// ENV variables types and interfaces
import { z } from "zod";

import { envVariables, testEnvVariables } from "config/env.config";

declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends z.infer<typeof envVariables & typeof testEnvVariables> {}
  }
}
