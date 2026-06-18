import { describe, it, expect } from "vitest";
import type { TRole } from "@/types";

describe("getSidebarItems", () => {
  it("returns user sidebar items for user role", async () => {
    const { getSidebarItems } = await import("@/utils/getSidebarItems");
    const items = getSidebarItems("USER" as TRole);
    expect(items.length).toBeGreaterThan(0);
    expect(items.some((i) => i.path.includes("/dashboard/user"))).toBe(true);
  });

  it("returns agent sidebar items for agent role", async () => {
    const { getSidebarItems } = await import("@/utils/getSidebarItems");
    const items = getSidebarItems("AGENT" as TRole);
    expect(items.length).toBeGreaterThan(0);
    expect(items.some((i) => i.path.includes("/dashboard/agent"))).toBe(true);
  });

  it("returns admin sidebar items for admin role", async () => {
    const { getSidebarItems } = await import("@/utils/getSidebarItems");
    const items = getSidebarItems("ADMIN" as TRole);
    expect(items.length).toBeGreaterThan(0);
    expect(items.some((i) => i.path.includes("/dashboard/admin"))).toBe(true);
  });

  it("returns empty array for undefined role", async () => {
    const { getSidebarItems } = await import("@/utils/getSidebarItems");
    const items = getSidebarItems(undefined);
    expect(items).toEqual([]);
  });

  it("returns admin sidebar items for superAdmin role", async () => {
    const { getSidebarItems } = await import("@/utils/getSidebarItems");
    const items = getSidebarItems("SUPER_ADMIN" as TRole);
    expect(items.length).toBeGreaterThan(0);
  });
});

describe("role constants", () => {
  it("has all expected role values", async () => {
    const { role } = await import("@/constants/role");
    expect(role.user).toBeDefined();
    expect(role.agent).toBeDefined();
    expect(role.admin).toBeDefined();
    expect(role.superAdmin).toBeDefined();
  });
});

describe("AuthCallback page", () => {
  it("exports default component", async () => {
    const mod = await import("@/pages/AuthCallback");
    expect(mod.default).toBeDefined();
  });
});

describe("NotFound page", () => {
  it("exports default component", async () => {
    const mod = await import("@/pages/NotFound");
    expect(mod.default).toBeDefined();
  });
});

describe("Route configuration", () => {
  it("dashboard routes include all expected paths", async () => {
    const { dashboardRoutes } = await import("@/routes/dashboard");
    interface RouteChild {
      path: string;
    }
    const paths = (dashboardRoutes[0].children as RouteChild[]).map((r) => r.path);

    expect(paths).toContain("user/deposit");
    expect(paths).toContain("user/withdraw");
    expect(paths).toContain("user/send-money");
    expect(paths).toContain("user/transactions");
    expect(paths).toContain("user/profile");
    expect(paths).toContain("user/profile/security");

    expect(paths).toContain("agent/add-money");
    expect(paths).toContain("agent/withdraw-money");
    expect(paths).toContain("agent/transactions");
    expect(paths).toContain("agent/commissions");
    expect(paths).toContain("agent/profile");

    expect(paths).toContain("admin/manage-users");
    expect(paths).toContain("admin/manage-agents");
    expect(paths).toContain("admin/manage-wallets");
    expect(paths).toContain("admin/all-transactions");
    expect(paths).toContain("admin/system-config");
    expect(paths).toContain("admin/create-admin");
    expect(paths).toContain("admin/profile");
  });
});
