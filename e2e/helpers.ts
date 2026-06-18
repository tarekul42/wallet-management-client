import { Page } from "@playwright/test";

/** Create a fake JWT that jwt-decode can parse (header.payload.sig). */
export function mockJwt(
  payload: Record<string, unknown> = {
    _id: "123",
    name: "Test User",
    email: "test@example.com",
    role: "USER",
    status: "active",
    isDeleted: false,
    iat: 1516239022,
    exp: 9999999999,
  },
): string {
  const enc = (o: unknown) =>
    Buffer.from(JSON.stringify(o)).toString("base64url");
  return `${enc({ alg: "HS256", typ: "JWT" })}.${enc(payload)}.fake_sig`;
}

/** Seed localStorage with a valid auth session and navigate to a URL. */
export async function loginAs(
  page: Page,
  role: "USER" | "AGENT" | "ADMIN" | "SUPER_ADMIN",
  url = "/",
) {
  const token = mockJwt({
    _id: "123",
    name: `Test ${role}`,
    email: `test.${role.toLowerCase()}@example.com`,
    role,
    status: "active",
    isDeleted: false,
    iat: 1516239022,
    exp: 9999999999,
  });
  await page.goto("/");
  await page.evaluate(
    ({ t }) => {
      localStorage.setItem("token", t);
      // Dispatch storage event so main.tsx bootstrap picks it up on hard
      // navigation; we do a soft navigation below so we also manually set.
      window.dispatchEvent(new Event("storage"));
    },
    { t: token },
  );
  await page.goto(url);
  // Wait for the app to settle (one tick for Redux dispatch)
  await page.waitForLoadState("networkidle");
}

/**
 * Mock common API endpoints so dashboard pages can render without a backend.
 * Call before navigating to any dashboard page.
 */
export async function mockCommonApis(page: Page) {
  const base = "**/api/v1";

  // Auth
  await page.route(`${base}/auth/login`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: {
          accessToken: mockJwt(),
          user: {
            _id: "123",
            name: "Test User",
            email: "test@example.com",
            role: "USER",
            status: "active",
            isDeleted: false,
          },
        },
      }),
    });
  });

  await page.route(`${base}/auth/logout`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });

  // Profile
  await page.route(`${base}/users/me`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: { name: "Test User", email: "test@example.com", phone: "+1234567890", role: "USER" },
      }),
    });
  });

  // Balance
  await page.route(`${base}/accounts/balance`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: { balance: 5000 } }),
    });
  });

  // Transaction history
  await page.route(`${base}/transactions/**`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: [], meta: { total: 0, page: 1, limit: 50 } }),
    });
  });

  // Dashboard statistics (admin)
  await page.route(`${base}/admin/dashboard-statistics`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: { totalUsers: 100, totalAgents: 10, totalTransactions: 500, totalVolume: 100000 },
      }),
    });
  });

  // Agent dashboard summary
  await page.route(`${base}/agent/dashboard-summary`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: { totalCustomers: 50, totalCommission: 5000, successRate: 98 },
      }),
    });
  });

  // Catch-all: any other API call returns empty success
  await page.route(`${base}/**`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: {} }),
    });
  });
}
