import { test, expect, Page } from "@playwright/test";
import { mockCommonApis } from "./helpers";

const PUBLIC_PAGES = [
  { path: "/", needsMock: true },
  { path: "/about", needsMock: true },
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
        await mockCommonApis(page);
      }
      const response = await page.goto(path, { waitUntil: "networkidle" });
      expect(response?.status()).toBeLessThan(400);
      // Wait for React to hydrate and render at least one heading
      await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });
    });
  }
});
