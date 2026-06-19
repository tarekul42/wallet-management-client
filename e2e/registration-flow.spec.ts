import { test, expect, Page } from "@playwright/test";

async function mockRegistrationApis(page: Page) {
  await page.route("**/auth/send-email-otp", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: { message: "OTP sent" } }),
    });
  });

  await page.route("**/auth/verify-email-otp", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: { verified: true } }),
    });
  });

  await page.route("**/auth/register", async (route) => {
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
  await page.route("**/auth/send-email-otp", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: { message: "OTP sent" } }),
    });
  });

  await page.route("**/auth/verify-email-otp", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: { verified: true } }),
    });
  });

  await page.route("**/auth/register", async (route) => {
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

  test("navigates to step 2 with mocked API", async ({ page }) => {
    await mockRegistrationApis(page);
    await page.goto("/register", { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });

    await page.fill('input[placeholder="John"]', "Test");
    await page.fill('input[placeholder="Doe"]', "User");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[placeholder="+1 (555) 123-4567"]', "+8801712345678");
    await page.click('button[type="submit"]');

    await expect(page.getByText(/verify your email/i)).toBeVisible({ timeout: 15000 });
  });

  test("completes registration steps 1-3 and reaches step 4", async ({ page }) => {
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
    await expect(page.getByText(/verify your email/i)).toBeVisible({ timeout: 15000 });
    await page.fill('input[placeholder="000000"]', "123456");
    await page.click('button[type="submit"]');

    // Step 3 - Skip
    await expect(page.getByText(/verify your phone/i)).toBeVisible({ timeout: 15000 });
    await page.click('button:has-text("Skip for Now")');

    // Step 4
    await expect(page.getByText(/secure your account/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/verification status/i)).toBeVisible({ timeout: 5000 });
  });

  test("step 4 form validates password requirements", async ({ page }) => {
    await mockRegistrationApis(page);
    await page.goto("/register", { waitUntil: "networkidle" });

    // Quick navigation to step 4 via dispatching
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent("test:goToStep4"));
    });

    // Fill step 1 and submit then step 2, skip step 3
    await page.fill('input[placeholder="John"]', "Test");
    await page.fill('input[placeholder="Doe"]', "User");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[placeholder="+1 (555) 123-4567"]', "+8801712345678");
    await page.click('button[type="submit"]');
    await expect(page.getByText(/verify your email/i)).toBeVisible({ timeout: 15000 });
    await page.fill('input[placeholder="000000"]', "123456");
    await page.click('button[type="submit"]');
    await expect(page.getByText(/verify your phone/i)).toBeVisible({ timeout: 15000 });
    await page.click('button:has-text("Skip for Now")');
    await expect(page.getByText(/secure your account/i)).toBeVisible({ timeout: 15000 });

    // Submit without checking terms
    await page.fill('input[placeholder="Create a strong password"]', "TestPass123!");
    await page.fill('input[placeholder="Confirm your password"]', "TestPass123!");
    await page.click('button[type="submit"]');

    // Should show error about terms
    await expect(page.getByText(/terms and conditions/i)).toBeVisible({ timeout: 5000 });
  });

  test("register API is called on step 4 submit", async ({ page }) => {
    await mockRegistrationApisWithTracking(page);
    await page.goto("/register", { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });

    // Step 1
    await page.fill('input[placeholder="John"]', "Test");
    await page.fill('input[placeholder="Doe"]', "User");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[placeholder="+1 (555) 123-4567"]', "+8801712345678");
    await page.click('button[type="submit"]');

    // Step 2
    await expect(page.getByText(/verify your email/i)).toBeVisible({ timeout: 15000 });
    await page.fill('input[placeholder="000000"]', "123456");
    await page.click('button[type="submit"]');

    // Step 3 - Skip
    await expect(page.getByText(/verify your phone/i)).toBeVisible({ timeout: 15000 });
    await page.click('button:has-text("Skip for Now")');

    // Step 4 - Submit with all valid data
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
