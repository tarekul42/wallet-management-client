import { test, expect } from "@playwright/test";
import { loginAs } from "./helpers";

const FORBIDDEN_ROUTES: { role: "USER" | "AGENT" | "ADMIN"; forbidden: string[] }[] = [
  {
    role: "USER",
    forbidden: [
      "/dashboard/admin",
      "/dashboard/admin/manage-users",
      "/dashboard/agent",
      "/dashboard/agent/add-money",
    ],
  },
  {
    role: "AGENT",
    forbidden: [
      "/dashboard/admin",
      "/dashboard/admin/manage-users",
      "/dashboard/user",
      "/dashboard/user/deposit",
    ],
  },
  // ADMIN/SUPER_ADMIN have full access to all segments - no forbidden routes
];

test.describe("Role-based access control", () => {
  for (const { role, forbidden } of FORBIDDEN_ROUTES) {
    for (const path of forbidden) {
      test(`${role} cannot access ${path}`, async ({ page }) => {
        await loginAs(page, role, path);
        await page.waitForLoadState("networkidle");
        // Should be redirected away from the forbidden page
        await expect(page).not.toHaveURL(path, { timeout: 10000 });
      });
    }
  }

  test("unauthenticated user is redirected to login", async ({ page }) => {
    await page.goto("/dashboard/user", { waitUntil: "networkidle" });
    await page.waitForURL("**/login", { timeout: 10000 });
  });

  test("user cannot access agent routes", async ({ page }) => {
    await loginAs(page, "USER", "/dashboard/agent");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/dashboard\/user/, { timeout: 10000 });
  });

  test("agent cannot access user routes", async ({ page }) => {
    await loginAs(page, "AGENT", "/dashboard/user");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/dashboard\/agent/, { timeout: 10000 });
  });

  test("admin can access user routes", async ({ page }) => {
    await loginAs(page, "ADMIN", "/dashboard/user");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
  });

  test("admin can access agent routes", async ({ page }) => {
    await loginAs(page, "ADMIN", "/dashboard/agent");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
  });
});
