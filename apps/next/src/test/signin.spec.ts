import { test, expect } from "@playwright/test";

test("should sign in with email and password", async ({ page }) => {
  await page.goto("http://localhost:3001");

  await expect(page).toHaveURL("http://localhost:3001/auth/signin");

  const email = process.env.NEXT_PUBLIC_TEST_USER_EMAIL;
  const password = process.env.NEXT_PUBLIC_TEST_USER_PASSWORD;

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL("http://localhost:3001/auth/accounts");
});
