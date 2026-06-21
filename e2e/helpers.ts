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

/** Seed sessionStorage with a valid auth session and navigate to a URL. */
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
  await mockCommonApis(page);
  await page.goto("/");
  await page.evaluate(
    ({ t }) => {
      sessionStorage.setItem("token", t);
    },
    { t: token },
  );
  await page.goto(url);
  await page.waitForLoadState("networkidle");
}

const mockResponses: Record<string, object> = {
  "POST /api/v1/auth/login": {
    success: true,
    statusCode: 200,
    message: "User Logged In Successfully",
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
      redirect: "/dashboard",
    },
  },
  "POST /api/v1/auth/logout": { success: true },
  "GET /api/v1/users/me": {
    success: true,
    data: { name: "Test User", email: "test@example.com", phone: "+1234567890", role: "USER" },
  },
  "GET /api/v1/wallets/me": { success: true, data: { balance: 5000 } },
  "GET /api/v1/transactions/history": {
    success: true,
    data: [],
    meta: { total: 0, page: 1, limit: 50 },
  },
  "GET /api/v1/admin/summary": {
    success: true,
    data: { totalUsers: 100, totalAgents: 10, totalTransactions: 500, totalVolume: 100000 },
  },
  "GET /api/v1/agent/summary": {
    success: true,
    data: { totalCustomers: 50, totalCommission: 5000, successRate: 98 },
  },
};

/**
 * Mock common API endpoints so dashboard pages can render without a backend.
 * Call before navigating to any dashboard page.
 */
export async function mockCommonApis(page: Page) {
  await page.route("**/*", async (route) => {
    const req = route.request();
    const method = req.method();
    const url = new URL(req.url());

    if (!url.pathname.startsWith("/api/v1")) {
      return route.fallback();
    }

    const key = `${method} ${url.pathname}`;
    const body = mockResponses[key];

    if (body) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(body),
      });
    } else {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, data: {} }),
      });
    }
  });
}
