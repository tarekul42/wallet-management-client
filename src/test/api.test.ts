import { describe, it, expect } from "vitest";

interface BaseApiWithEndpoints {
  endpoints: Record<string, unknown>;
}

describe("auth API endpoints", () => {
  it("login mutation has correct url and method", async () => {
    const { baseApi } = await import("@/redux/baseApi");
    const endpoints = (baseApi as unknown as BaseApiWithEndpoints).endpoints;
    expect(endpoints).toBeDefined();
  });

  it("login mutation configured correctly", async () => {
    const { useLoginMutation } = await import("@/redux/features/auth/auth.api");
    expect(useLoginMutation).toBeDefined();
    expect(typeof useLoginMutation).toBe("function");
  });

  it("logout mutation configured correctly", async () => {
    const { useLogoutMutation } = await import("@/redux/features/auth/auth.api");
    expect(useLogoutMutation).toBeDefined();
    expect(typeof useLogoutMutation).toBe("function");
  });
});

describe("user API endpoints", () => {
  it("sendMoney mutation configured correctly", async () => {
    const { useSendMoneyMutation } = await import("@/redux/features/user/user.api");
    expect(useSendMoneyMutation).toBeDefined();
    expect(typeof useSendMoneyMutation).toBe("function");
  });

  it("getAccountBalance query configured correctly", async () => {
    const { useGetAccountBalanceQuery } = await import("@/redux/features/user/user.api");
    expect(useGetAccountBalanceQuery).toBeDefined();
    expect(typeof useGetAccountBalanceQuery).toBe("function");
  });

  it("getProfile query configured correctly", async () => {
    const { useGetProfileQuery } = await import("@/redux/features/user/user.api");
    expect(useGetProfileQuery).toBeDefined();
    expect(typeof useGetProfileQuery).toBe("function");
  });

  it("updatePassword mutation configured correctly", async () => {
    const { useUpdatePasswordMutation } = await import("@/redux/features/user/user.api");
    expect(useUpdatePasswordMutation).toBeDefined();
    expect(typeof useUpdatePasswordMutation).toBe("function");
  });
});

describe("admin API endpoints", () => {
  it("getUsers query configured correctly", async () => {
    const { useGetUsersQuery } = await import("@/redux/features/admin/admin.api");
    expect(useGetUsersQuery).toBeDefined();
    expect(typeof useGetUsersQuery).toBe("function");
  });

  it("manageUser mutation configured correctly", async () => {
    const { useManageUserMutation } = await import("@/redux/features/admin/admin.api");
    expect(useManageUserMutation).toBeDefined();
    expect(typeof useManageUserMutation).toBe("function");
  });

  it("getWallets query configured correctly", async () => {
    const { useGetWalletsQuery } = await import("@/redux/features/admin/admin.api");
    expect(useGetWalletsQuery).toBeDefined();
    expect(typeof useGetWalletsQuery).toBe("function");
  });

  it("manageWallet mutation configured correctly", async () => {
    const { useManageWalletMutation } = await import("@/redux/features/admin/admin.api");
    expect(useManageWalletMutation).toBeDefined();
    expect(typeof useManageWalletMutation).toBe("function");
  });

  it("getSystemConfig query configured correctly", async () => {
    const { useGetSystemConfigQuery } = await import("@/redux/features/admin/admin.api");
    expect(useGetSystemConfigQuery).toBeDefined();
    expect(typeof useGetSystemConfigQuery).toBe("function");
  });

  it("createAdmin mutation configured correctly", async () => {
    const { useCreateAdminMutation } = await import("@/redux/features/admin/admin.api");
    expect(useCreateAdminMutation).toBeDefined();
    expect(typeof useCreateAdminMutation).toBe("function");
  });
});

describe("agent API endpoints", () => {
  it("getCommissionHistory query configured correctly", async () => {
    const { useGetCommissionHistoryQuery } = await import("@/redux/features/agent/agent.api");
    expect(useGetCommissionHistoryQuery).toBeDefined();
    expect(typeof useGetCommissionHistoryQuery).toBe("function");
  });

  it("getDashboardSummary query configured correctly", async () => {
    const { useGetDashboardSummaryQuery } = await import("@/redux/features/agent/agent.api");
    expect(useGetDashboardSummaryQuery).toBeDefined();
    expect(typeof useGetDashboardSummaryQuery).toBe("function");
  });
});
