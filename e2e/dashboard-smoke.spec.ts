import { test, expect } from "@playwright/test";
import { loginAs } from "./helpers";

const USER_PAGES = [ 
  "/dashboard/user",
  "/dashboard/user/deposit",
  "/dashboard/user/withdraw",
  "/dashboard/user/send-money",
  "/dashboard/user/transactions",
  "/dashboard/user/profile",
  "/dashboard/user/profile/security",
];

const AGENT_PAGES = [
  "/dashboard/agent",
  "/dashboard/agent/add-money",
  "/dashboard/agent/withdraw-money",
  "/dashboard/agent/transactions",
  "/dashboard/agent/commissions",
  "/dashboard/agent/profile",
];

const ADMIN_PAGES = [
  "/dashboard/admin",
  "/dashboard/admin/manage-users",
  "/dashboard/admin/manage-agents",
  "/dashboard/admin/manage-wallets",
  "/dashboard/admin/all-transactions",
  "/dashboard/admin/system-config",
  "/dashboard/admin/create-admin",
  "/dashboard/admin/profile",
];

test.describe("Dashboard smoke tests", () => {
  test.describe("User dashboard pages", () => {
    for (const path of USER_PAGES) {
      test(`loads ${path}`, async ({ page }) => {
        await loginAs(page, "USER", path);
        await page.waitForLoadState("networkidle");
        await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
      });
    }
  });

  test.describe("Agent dashboard pages", () => {
    for (const path of AGENT_PAGES) {
      test(`loads ${path}`, async ({ page }) => {
        await loginAs(page, "AGENT", path);
        await page.waitForLoadState("networkidle");
        await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
      });
    }
  });

  test.describe("Admin dashboard pages", () => {
    for (const path of ADMIN_PAGES) {
      test(`loads ${path}`, async ({ page }) => {
        await loginAs(page, "ADMIN", path);
        await page.waitForLoadState("networkidle");
        await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
      });
    }
  });
});
