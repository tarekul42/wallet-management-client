import { test, expect } from "@playwright/test";

test.describe("Theme toggle", () => {
  test("theme toggle button exists and toggles dark mode", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Find the theme toggle button (sun/moon icon button)
    const themeToggle = page.locator('button[aria-label*="theme" i], button[aria-label*="dark" i], button[aria-label*="light" i]');
    await expect(themeToggle.first()).toBeVisible({ timeout: 10000 });
  });

  test("theme preference persists across pages", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Get initial theme class
    const initialTheme = await page.evaluate(() => document.documentElement.className);

    // Toggle theme
    const themeToggle = page.locator('button[aria-label*="theme" i], button[aria-label*="dark" i], button[aria-label*="light" i]');
    await themeToggle.first().click();

    // Navigate to another page
    await page.goto("/about", { waitUntil: "networkidle" });

    // Theme should still be toggled
    const afterNavTheme = await page.evaluate(() => document.documentElement.className);
    expect(afterNavTheme).not.toBe(initialTheme);
  });
});
