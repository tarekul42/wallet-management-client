import { test, expect } from "@playwright/test";
import { mockCommonApis } from "./helpers";

const PUBLIC_PAGES = [
  { path: "/" },
  { path: "/about" },
  { path: "/features" },
  { path: "/contact" },
  { path: "/faqs" },
  { path: "/explore" },
  { path: "/login" },
  { path: "/register" },
  { path: "/forgot-password" },
  { path: "/nonexistent-route" },
];

test.describe("Public pages", () => {
  for (const { path } of PUBLIC_PAGES) {
    test(`loads ${path}`, async ({ page }) => {
      await mockCommonApis(page);
      const response = await page.goto(path, { waitUntil: "networkidle" });
      expect(response?.status()).toBeLessThan(400);
      // Wait for React to hydrate and render at least one heading
      await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });
    });
  }
});
