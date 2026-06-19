import { test, expect, Page } from "@playwright/test";

async function mockServiceApis(page: Page) {
  // Intercept service API calls at the relative URL (no /api/v1 prefix
  // since VITE_BASE_URL is not set at build time, axios uses the page origin)
  await page.route("**/services", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: [], meta: { total: 0, page: 1, limit: 50 } }),
    });
  });

  await page.route("**/services/categories", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: [] }),
    });
  });
}

const PUBLIC_PAGES = [
  { path: "/", needsMock: false },
  { path: "/about", needsMock: false },
  { path: "/features", needsMock: false },
  { path: "/contact", needsMock: false },
  { path: "/faqs", needsMock: false },
  { path: "/explore", needsMock: true },
  { path: "/login", needsMock: false },
  { path: "/register", needsMock: false },
  { path: "/forgot-password", needsMock: false },
  { path: "/nonexistent-route", needsMock: false },
];

test.describe("Public pages", () => {
  for (const { path, needsMock } of PUBLIC_PAGES) {
    test(`loads ${path}`, async ({ page }) => {
      if (needsMock) {
        await mockServiceApis(page);
      }
      const response = await page.goto(path, { waitUntil: "networkidle" });
      expect(response?.status()).toBeLessThan(400);
      // Wait for React to hydrate and render at least one heading
      await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });
    });
  }
});
