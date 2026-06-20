import { test, expect, Page } from "@playwright/test";

async function mockRegistrationApis(page: Page) {
  await page.route("**/api/v1/auth/register", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: { message: "Account created successfully" },
      }),
    });
  });
}

let registerCallCount = 0;

async function mockRegistrationApisWithTracking(page: Page) {
  await page.route("**/api/v1/auth/register", async (route) => {
    registerCallCount++;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: { message: "Account created successfully" },
      }),
    });
  });
}

test.describe("Registration flow", () => {
  test.beforeEach(() => {
    registerCallCount = 0;
  });

  test("renders registration page with role selection", async ({ page }) => {
    await page.goto("/register", { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/choose account type/i)).toBeVisible();
  });

  test("shows validation errors on empty step 1 submit", async ({ page }) => {
    await page.goto("/register", { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });

    await page.click('button[type="submit"]');
    await expect(page.getByText(/must be at least/i).first()).toBeVisible({ timeout: 5000 });
  });

  test("navigates to step 2 after filling basic info", async ({ page }) => {
    await mockRegistrationApis(page);
    await page.goto("/register", { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });

    await page.fill('input[placeholder="John"]', "Test");
    await page.fill('input[placeholder="Doe"]', "User");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[placeholder="+1 (555) 123-4567"]', "+8801712345678");
    await page.click('button[type="submit"]');

    await expect(page.getByText(/secure your account/i)).toBeVisible({ timeout: 15000 });
  });

  test("completes registration and reaches password step", async ({ page }) => {
    await mockRegistrationApis(page);
    await page.goto("/register", { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });

    // Step 1
    await page.fill('input[placeholder="John"]', "Test");
    await page.fill('input[placeholder="Doe"]', "User");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[placeholder="+1 (555) 123-4567"]', "+8801712345678");
    await page.click('button[type="submit"]');

    // Step 2
    await expect(page.getByText(/secure your account/i)).toBeVisible({ timeout: 15000 });
  });

  test("step 2 form validates password requirements", async ({ page }) => {
    await mockRegistrationApis(page);
    await page.goto("/register", { waitUntil: "networkidle" });

    // Fill step 1 and submit
    await page.fill('input[placeholder="John"]', "Test");
    await page.fill('input[placeholder="Doe"]', "User");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[placeholder="+1 (555) 123-4567"]', "+8801712345678");
    await page.click('button[type="submit"]');

    await expect(page.getByText(/secure your account/i)).toBeVisible({ timeout: 15000 });

    // Submit without checking terms
    await page.fill('input[placeholder="Create a strong password"]', "TestPass123!");
    await page.fill('input[placeholder="Confirm your password"]', "TestPass123!");
    await page.click('button[type="submit"]');

    // Should show error about terms
    await expect(page.getByText(/terms and conditions/i)).toBeVisible({ timeout: 5000 });
  });

  test("register API is called on step 2 submit", async ({ page }) => {
    await mockRegistrationApisWithTracking(page);
    await page.goto("/register", { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });

    // Step 1
    await page.fill('input[placeholder="John"]', "Test");
    await page.fill('input[placeholder="Doe"]', "User");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[placeholder="+1 (555) 123-4567"]', "+8801712345678");
    await page.click('button[type="submit"]');

    // Step 2 - Submit with all valid data
    await expect(page.getByText(/secure your account/i)).toBeVisible({ timeout: 15000 });
    await page.fill('input[placeholder="Create a strong password"]', "TestPass123!");
    await page.fill('input[placeholder="Confirm your password"]', "TestPass123!");
    await page.click('input[type="checkbox"]');
    await page.click('button[type="submit"]');

    // Wait for the API call to be made
    await page.waitForTimeout(3000);
    expect(registerCallCount).toBe(1);
  });
});
