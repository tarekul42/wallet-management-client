import { test, expect, Page } from "@playwright/test";
import { loginAs, mockCommonApis } from "./helpers";

async function mockDepositWithdrawApis(page: Page) {
  await page.route("**/api/v1/transactions/add-money", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: { balance: 5100 } }),
    });
  });

  await page.route("**/api/v1/transactions/withdraw-money", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: { balance: 4950 } }),
    });
  });

  await page.route("**/api/v1/transactions/send-money", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: { balance: 4900 } }),
    });
  });
}

test.describe("Dashboard interactions", () => {
  test.describe("Deposit form", () => {
    test("renders deposit form", async ({ page }) => {
      await mockCommonApis(page);
      await loginAs(page, "USER", "/dashboard/user/deposit");
      await page.waitForLoadState("networkidle");
      await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
      await expect(page.getByText(/deposit funds/i)).toBeVisible();
    });

    test("submits deposit with valid data", async ({ page }) => {
      await mockCommonApis(page);
      await mockDepositWithdrawApis(page);
      await loginAs(page, "USER", "/dashboard/user/deposit");
      await page.waitForLoadState("networkidle");
      await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });

      await page.fill('input[type="number"]', "100");
      await page.click('button[type="submit"]');
    });
  });

  test.describe("Withdraw form", () => {
    test("renders withdraw form", async ({ page }) => {
      await mockCommonApis(page);
      await loginAs(page, "USER", "/dashboard/user/withdraw");
      await page.waitForLoadState("networkidle");
      await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
      await expect(page.getByText("Withdraw Funds").first()).toBeVisible();
    });

    test("submits withdraw with valid data", async ({ page }) => {
      await mockCommonApis(page);
      await mockDepositWithdrawApis(page);
      await loginAs(page, "USER", "/dashboard/user/withdraw");
      await page.waitForLoadState("networkidle");
      await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });

      await page.fill('input[type="number"]', "50");
      await page.click('button[type="submit"]');
    });
  });

  test.describe("Send money form", () => {
    test("renders send money form", async ({ page }) => {
      await mockCommonApis(page);
      await loginAs(page, "USER", "/dashboard/user/send-money");
      await page.waitForLoadState("networkidle");
      await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
      await expect(page.getByText(/send funds/i)).toBeVisible();
    });
  });

  test.describe("Sidebar navigation", () => {
    test("navigates between dashboard pages via sidebar", async ({ page }) => {
      await loginAs(page, "USER", "/dashboard/user");
      await page.waitForLoadState("networkidle");
      await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });

      const sidebarLinks = page.locator("nav a");
      const linkCount = await sidebarLinks.count();

      for (let i = 1; i < Math.min(linkCount, 4); i++) {
        const link = sidebarLinks.nth(i);
        const href = await link.getAttribute("href");
        if (href && !href.includes("#")) {
          await link.click();
          await page.waitForLoadState("networkidle");
          await expect(page).toHaveURL(new RegExp(href.replace("/", "\\/")), { timeout: 10000 });
        }
      }
    });
  });

  test.describe("Profile page", () => {
    test("loads user profile page", async ({ page }) => {
      await mockCommonApis(page);
      await loginAs(page, "USER", "/dashboard/user/profile");
      await page.waitForLoadState("networkidle");
      await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
    });

    test("loads security settings page", async ({ page }) => {
      await mockCommonApis(page);
      await loginAs(page, "USER", "/dashboard/user/profile/security");
      await page.waitForLoadState("networkidle");
      await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
    });
  });
});
