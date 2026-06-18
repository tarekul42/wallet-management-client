import { test, expect } from "@playwright/test";
import { mockCommonApis, loginAs } from "./helpers";

test.describe("Auth flows", () => {
  test.describe("Login page", () => {
    test("shows validation errors on empty submit", async ({ page }) => {
      await page.goto("/login", { waitUntil: "networkidle" });
      await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
      await expect(page.locator("h1")).toHaveText(/welcome back/i);

      await page.click('button[type="submit"]');
      await expect(page.getByText(/valid email|required/i).first()).toBeVisible({ timeout: 5000 });
    });

    test("successful login with mocked API redirects to home", async ({ page }) => {
      await mockCommonApis(page);
      await page.goto("/login", { waitUntil: "networkidle" });
      await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });

      await page.fill('input[type="email"]', "test@example.com");
      await page.fill('input[type="password"]', "password123");
      await page.click('button[type="submit"]');

      await page.waitForURL("http://localhost:3000/", { timeout: 10000 });
    });
  });

  test.describe("Auth guard", () => {
    test("redirects unauthenticated user from dashboard to login", async ({ page }) => {
      await page.goto("/dashboard/user", { waitUntil: "networkidle" });
      await page.waitForURL("**/login", { timeout: 10000 });
      await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
    });

    test("authenticated user can access dashboard", async ({ page }) => {
      await loginAs(page, "USER", "/dashboard/user");
      await page.waitForLoadState("networkidle");
      await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
    });
  });

  test.describe("Forgot Password", () => {
    test("renders forgot password form", async ({ page }) => {
      await page.goto("/forgot-password", { waitUntil: "networkidle" });
      await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
      await expect(page.locator('input[type="email"]')).toBeVisible();
    });
  });

  test.describe("Reset Password", () => {
    test("renders reset password form with token", async ({ page }) => {
      await page.goto("/reset-password?token=testtoken123", { waitUntil: "networkidle" });
      await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
    });
  });

  test.describe("Auth Callback", () => {
    test("redirects to dashboard with token in URL", async ({ page }) => {
      await mockCommonApis(page);
      await page.goto("/auth/callback?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjMiLCJuYW1lIjoiVGVzdCIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.fakesig&refreshToken=abc", { waitUntil: "networkidle" });
      await page.waitForURL("**/dashboard**", { timeout: 15000 });
    });
  });
});
