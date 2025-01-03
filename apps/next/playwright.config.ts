import { devices } from "@playwright/test";
import type { PlaywrightTestConfig } from "@playwright/test";

import CONSTANTS from "config/constants";

const { DASHBOARD_URL } = CONSTANTS;

const config: PlaywrightTestConfig = {
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: "src/test",
  testMatch: "**/*.spec.ts",
  testIgnore: ["!**/*.spec.ts", "**/node_modules/**/*"],
  globalSetup: require.resolve("./src/test/e2e/setup.ts"),
  timeout: 10000,
  // Run all tests in parallel.
  fullyParallel: true,
  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,
  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,
  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,
  // Reporter to use
  reporter: "html",
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: DASHBOARD_URL,
    // Collect trace when retrying the failed test.
    trace: "on-first-retry"
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ],
  // Run your local dev server before starting the tests.
  webServer: {
    command:
      "cross-env NEXT_PUBLIC_ENV='test' npx turbo run build && npx next start -p 3001",
    url: "http://127.0.0.1:3001",
    reuseExistingServer: !process.env.CI,
    timeout: 10 * 60 * 1000 // 10 minutes
  }
};

export default config;
