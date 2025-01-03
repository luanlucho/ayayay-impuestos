import { FullConfig } from "@playwright/test";
import dotenv from "dotenv";

const globalSetup = async (config: FullConfig) => {
  dotenv.config({ path: ".env" });
  dotenv.config({ path: ".env.test", override: true });
};

export default globalSetup;
