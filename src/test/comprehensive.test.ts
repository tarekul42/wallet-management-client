import { describe, it, expect } from "vitest";
import type { TRole } from "@/types";

describe("All source modules import successfully", () => {

  // --- Types ---
  it("types/api", async () => {
    const m = await import("@/types/api");
    expect(m).toBeDefined();
  });
  it("types/index", async () => { expect(await import("@/types/index")).toBeDefined(); });
  it("types/user", async () => { expect(await import("@/types/user")).toBeDefined(); });

  // --- Constants & Config ---
  it("constants/role", async () => {
    const { role } = await import("@/constants/role");
    expect(role.user).toBe("USER");
    expect(role.agent).toBe("AGENT");
    expect(role.admin).toBe("ADMIN");
    expect(role.superAdmin).toBe("SUPER_ADMIN");
  });
  it("config/index", async () => { expect(await import("@/config/index")).toBeDefined(); });

  // --- Lib & CSS ---
  it("lib/utils", async () => {
    const { cn } = await import("@/lib/utils");
    expect(cn("a", "b")).toBe("a b");
    const falsyValue = false as const;
    expect(cn("a", falsyValue && "b")).toBe("a");
  });
  it("lib/axios", async () => { expect(await import("@/lib/axios")).toBeDefined(); });
  it("index.css", async () => { expect(await import("@/index.css")).toBeDefined(); });

  // --- Assets / Data ---
  it("assets/data/faqsData", async () => {
    const { faqsData } = await import("@/assets/data/faqsData");
    expect(faqsData.length).toBeGreaterThan(0);
  });
  it("assets/data/benefits", async () => { expect(await import("@/assets/data/benefits")).toBeDefined(); });
  it("assets/data/visualShowcase", async () => { expect(await import("@/assets/data/visualShowcase")).toBeDefined(); });
  it("assets/data/Features/coreFeatures", async () => { expect(await import("@/assets/data/Features/coreFeatures")).toBeDefined(); });
  it("assets/data/Features/advancedFeatures", async () => { expect(await import("@/assets/data/Features/advancedFeatures")).toBeDefined(); });
  it("assets/data/Home/features", async () => { expect(await import("@/assets/data/Home/features")).toBeDefined(); });
  it("assets/data/Home/howItWorks", async () => { expect(await import("@/assets/data/Home/howItWorks")).toBeDefined(); });
  it("assets/data/Home/services", async () => { expect(await import("@/assets/data/Home/services")).toBeDefined(); });
  it("assets/data/Home/testimonials", async () => { expect(await import("@/assets/data/Home/testimonials")).toBeDefined(); });
  it("assets/data/register/roleOptions", async () => { expect(await import("@/assets/data/register/roleOptions")).toBeDefined(); });
  it("assets/data/register/steps", async () => { expect(await import("@/assets/data/register/steps")).toBeDefined(); });
  it("assets/icons/Logo", async () => { expect((await import("@/assets/icons/Logo")).default).toBeDefined(); });

  // --- Schemas ---
  it("schemas/login", async () => { expect(await import("@/schemas/login")).toBeDefined(); });
  it("schemas/register/steps", async () => { expect(await import("@/schemas/register/steps")).toBeDefined(); });

  // --- Context & Providers ---
  it("context/theme.context", async () => { expect(await import("@/context/theme.context")).toBeDefined(); });
  it("providers/theme.provider", async () => {
    const { ThemeProvider } = await import("@/providers/theme.provider");
    expect(ThemeProvider).toBeDefined();
  });

  // --- Hooks ---
  it("hooks/use-theme", async () => {
    const { useTheme } = await import("@/hooks/use-theme");
    expect(useTheme).toBeDefined();
  });
  it("hooks/use-mobaile", async () => { expect(await import("@/hooks/use-mobaile")).toBeDefined(); });

  // --- Utils ---
  it("utils/jwt", async () => { expect(await import("@/utils/jwt")).toBeDefined(); });
  it("utils/logger", async () => { expect(await import("@/utils/logger")).toBeDefined(); });
  it("utils/withAuth", async () => { expect((await import("@/utils/withAuth")).default).toBeDefined(); });
  it("utils/generateRoutes", async () => { expect(await import("@/utils/generateRoutes")).toBeDefined(); });
  it("utils/register/startOtpTimer", async () => { expect(await import("@/utils/register/startOtpTimer")).toBeDefined(); });
  it("utils/getSidebarItems", async () => {
    const { getSidebarItems } = await import("@/utils/getSidebarItems");
    expect(getSidebarItems("USER" as TRole).length).toBeGreaterThan(0);
    expect(getSidebarItems("AGENT" as TRole).length).toBeGreaterThan(0);
    expect(getSidebarItems("ADMIN" as TRole).length).toBeGreaterThan(0);
    expect(getSidebarItems(undefined)).toEqual([]);
  });

  // --- Redux ---
  it("redux/store", async () => {
    const { store: s } = await import("@/redux/store");
    expect(s.getState).toBeDefined();
    expect(s.dispatch).toBeDefined();
  });
  it("redux/hook", async () => {
    const { useAppDispatch, useAppSelector } = await import("@/redux/hook");
    expect(useAppDispatch).toBeDefined();
    expect(useAppSelector).toBeDefined();
  });
  it("redux/baseApi", async () => {
    const { baseApi } = await import("@/redux/baseApi");
    expect(baseApi.reducerPath).toBe("baseApi");
  });
  it("redux/axiosBaseQuery", async () => { expect(await import("@/redux/axiosBaseQuery")).toBeDefined(); });
  it("redux/features/auth/authSlice", async () => {
    const { default: reducer, setCredentials, logout, setGlobalLoader } = await import("@/redux/features/auth/authSlice");
    expect(reducer).toBeDefined();
    expect(setCredentials).toBeDefined();
    expect(logout).toBeDefined();
    expect(setGlobalLoader).toBeDefined();
    const state = { token: null, user: null, globalLoader: false };
    const s2 = reducer(state, setCredentials({ token: "t", user: { name: "T", email: "t@t.com", role: "USER" } }));
    expect(s2.user?.name).toBe("T");
    const s3 = reducer(s2, logout());
    expect(s3.user).toBeNull();
  });
  it("redux/features/registrationSlice", async () => {
    const { default: reducer } = await import("@/redux/features/registrationSlice");
    expect(reducer).toBeDefined();
  });

  // --- API slices ---
  it("redux/features/auth/auth.api", async () => {
    const m = await import("@/redux/features/auth/auth.api");
    expect(m.useLoginMutation).toBeDefined();
    expect(m.useLogoutMutation).toBeDefined();
    expect(m.useRegisterMutation).toBeDefined();
    expect(m.useSendEmailOtpMutation).toBeDefined();
    expect(m.useVerifyEmailOtpMutation).toBeDefined();
    expect(m.useSendPhoneOtpMutation).toBeDefined();
    expect(m.useVerifyPhoneOtpMutation).toBeDefined();
  });
  it("redux/features/user/user.api", async () => {
    const m = await import("@/redux/features/user/user.api");
    expect(m.useSendMoneyMutation).toBeDefined();
    expect(m.useGetAccountBalanceQuery).toBeDefined();
    expect(m.useGetTransactionHistoryQuery).toBeDefined();
    expect(m.useDepositMoneyMutation).toBeDefined();
    expect(m.useWithdrawMoneyMutation).toBeDefined();
    expect(m.useUpdateProfileMutation).toBeDefined();
    expect(m.useGetProfileQuery).toBeDefined();
    expect(m.useUpdatePasswordMutation).toBeDefined();
  });
  it("redux/features/agent/agent.api", async () => {
    const m = await import("@/redux/features/agent/agent.api");
    expect(m.useGetDashboardSummaryQuery).toBeDefined();
    expect(m.useAddMoneyToUserMutation).toBeDefined();
    expect(m.useWithdrawMoneyFromUserMutation).toBeDefined();
    expect(m.useGetCommissionHistoryQuery).toBeDefined();
  });
  it("redux/features/admin/admin.api", async () => {
    const m = await import("@/redux/features/admin/admin.api");
    expect(m.useGetDashboardStatisticsQuery).toBeDefined();
    expect(m.useGetUsersQuery).toBeDefined();
    expect(m.useManageUserMutation).toBeDefined();
    expect(m.useGetAgentsQuery).toBeDefined();
    expect(m.useManageAgentMutation).toBeDefined();
    expect(m.useGetAllTransactionsQuery).toBeDefined();
    expect(m.useCreateAdminMutation).toBeDefined();
    expect(m.useGetWalletsQuery).toBeDefined();
    expect(m.useManageWalletMutation).toBeDefined();
    expect(m.useGetSystemConfigQuery).toBeDefined();
    expect(m.useUpdateSystemConfigMutation).toBeDefined();
  });

  // --- Routes ---
  it("routes/index", async () => {
    const { router } = await import("@/routes/index");
    expect(router.routes.length).toBeGreaterThan(0);
  });
  it("routes/dashboard", async () => {
    const { dashboardRoutes } = await import("@/routes/dashboard");
    interface RouteChild {
      path: string;
    }
    const paths = (dashboardRoutes[0].children as RouteChild[]).map((r) => r.path);
    expect(paths).toContain("user/deposit");
    expect(paths).toContain("user/profile/security");
    expect(paths).toContain("agent/commissions");
    expect(paths).toContain("admin/manage-wallets");
    expect(paths).toContain("admin/system-config");
    expect(paths).toContain("admin/create-admin");
    expect(paths).toContain("admin/profile/security");
  });
  it("routes/adminSidebarItems", async () => {
    const m = await import("@/routes/adminSidebarItems");
    expect(m.adminSidebarItems.length).toBe(8);
  });
  it("routes/agentSidebarItems", async () => {
    const m = await import("@/routes/agentSidebarItems");
    expect(m.agentSidebarItems.length).toBe(6);
  });
  it("routes/userSidebarItems", async () => {
    const m = await import("@/routes/userSidebarItems");
    expect(m.userSidebarItems.length).toBeGreaterThan(0);
  });

  // --- UI Components ---
  it("components/ui/button", async () => { expect((await import("@/components/ui/button")).Button).toBeDefined(); });
  it("components/ui/badge", async () => { expect((await import("@/components/ui/badge")).Badge).toBeDefined(); });
  it("components/ui/card", async () => { const m = await import("@/components/ui/card"); expect(m.Card).toBeDefined(); expect(m.CardContent).toBeDefined(); expect(m.CardHeader).toBeDefined(); expect(m.CardTitle).toBeDefined(); });
  it("components/ui/input", async () => { expect((await import("@/components/ui/input")).Input).toBeDefined(); });
  it("components/ui/label", async () => { expect((await import("@/components/ui/label")).Label).toBeDefined(); });
  it("components/ui/skeleton", async () => { expect((await import("@/components/ui/skeleton")).Skeleton).toBeDefined(); });
  it("components/ui/textarea", async () => { expect((await import("@/components/ui/textarea")).Textarea).toBeDefined(); });
  it("components/ui/form", async () => { const m = await import("@/components/ui/form"); expect(m.Form).toBeDefined(); expect(m.FormField).toBeDefined(); expect(m.FormItem).toBeDefined(); expect(m.FormLabel).toBeDefined(); expect(m.FormControl).toBeDefined(); });
  it("components/ui/popover", async () => { const m = await import("@/components/ui/popover"); expect(m.Popover).toBeDefined(); expect(m.PopoverTrigger).toBeDefined(); expect(m.PopoverContent).toBeDefined(); });
  it("components/ui/navigation-menu", async () => { const m = await import("@/components/ui/navigation-menu"); expect(m.NavigationMenu).toBeDefined(); expect(m.NavigationMenuList).toBeDefined(); });
  it("components/ui/tooltip", async () => { expect((await import("@/components/ui/tooltip")).TooltipProvider).toBeDefined(); });
  it("components/ui/GlobalLoader", async () => { expect((await import("@/components/ui/GlobalLoader")).default).toBeDefined(); });


  // --- Layout Components ---
  it("components/layout/RootLayout", async () => { expect((await import("@/components/layout/RootLayout")).default).toBeDefined(); });
  it("components/layout/CommonLayout", async () => { expect((await import("@/components/layout/CommonLayout")).default).toBeDefined(); });
  it("components/layout/DashboardLayout", async () => { expect((await import("@/components/layout/DashboardLayout")).default).toBeDefined(); });
  it("components/layout/Navbar", async () => { expect((await import("@/components/layout/Navbar")).default).toBeDefined(); });
  it("components/layout/Footer", async () => { expect((await import("@/components/layout/Footer")).default).toBeDefined(); });
  it("components/layout/Sidebar", async () => { expect((await import("@/components/layout/Sidebar")).default).toBeDefined(); });
  it("components/layout/ScrollToTop", async () => { expect((await import("@/components/layout/ScrollToTop")).default).toBeDefined(); });

  // --- Module Components ---
  it("components/modules/Dashboard/DashboardStats", async () => { expect((await import("@/components/modules/Dashboard/DashboardStats")).default).toBeDefined(); });
  it("components/modules/Dashboard/SpendingChart", async () => { expect((await import("@/components/modules/Dashboard/SpendingChart")).default).toBeDefined(); });
  it("components/modules/Dashboard/TransactionTable", async () => { expect((await import("@/components/modules/Dashboard/TransactionTable")).default).toBeDefined(); });
  it("components/modules/ContactPage/ContactForm", async () => {
    const m = await import("@/components/modules/ContactPage/ContactForm");
    expect(m.ContactForm).toBeDefined();
  });

  // --- Pages ---
  it("pages/App", async () => { expect((await import("@/App")).default).toBeDefined(); });
  it("pages/About", async () => { expect((await import("@/pages/About")).default).toBeDefined(); });
  it("pages/Explore", async () => { expect((await import("@/pages/Explore")).default).toBeDefined(); });
  it("pages/Login", async () => { expect((await import("@/pages/Login")).default).toBeDefined(); });
  it("pages/Register", async () => { expect((await import("@/pages/Register")).default).toBeDefined(); });
  it("pages/ForgotPassword", async () => { expect((await import("@/pages/ForgotPassword")).default).toBeDefined(); });
  it("pages/ResetPassword", async () => { expect((await import("@/pages/ResetPassword")).default).toBeDefined(); });
  it("pages/AuthCallback", async () => { expect((await import("@/pages/AuthCallback")).default).toBeDefined(); });
  it("pages/NotFound", async () => { expect((await import("@/pages/NotFound")).default).toBeDefined(); });
  it("pages/ServiceDetails", async () => { expect((await import("@/pages/ServiceDetails")).default).toBeDefined(); });

  // --- Home sub-pages ---
  it("pages/Home/Home", async () => { expect((await import("@/pages/Home/Home")).default).toBeDefined(); });
  it("pages/Home/HeroSection", async () => { expect((await import("@/pages/Home/HeroSection")).default).toBeDefined(); });
  it("pages/Home/HowItWorks", async () => { expect((await import("@/pages/Home/HowItWorks")).default).toBeDefined(); });
  it("pages/Home/WhyChooseUs", async () => { expect((await import("@/pages/Home/WhyChooseUs")).default).toBeDefined(); });
  it("pages/Home/StatsSection", async () => { expect((await import("@/pages/Home/StatsSection")).default).toBeDefined(); });
  it("pages/Home/Testimonials", async () => { expect((await import("@/pages/Home/Testimonials")).default).toBeDefined(); });
  it("pages/Home/TrustAndSecurity", async () => { expect((await import("@/pages/Home/TrustAndSecurity")).default).toBeDefined(); });
  it("pages/Home/HomeCTASection", async () => { expect((await import("@/pages/Home/HomeCTASection")).default).toBeDefined(); });

  // --- Contact sub-pages ---
  it("pages/Contact/Contact", async () => { expect((await import("@/pages/Contact/Contact")).default).toBeDefined(); });
  it("pages/Contact/ContactPageHeading", async () => { expect((await import("@/pages/Contact/ContactPageHeading")).default).toBeDefined(); });
  it("pages/Contact/ContactAndLocation", async () => { expect((await import("@/pages/Contact/ContactAndLocation")).default).toBeDefined(); });

  // --- FAQ sub-pages ---
  it("pages/FAQ/FAQs", async () => { expect((await import("@/pages/FAQ/FAQs")).default).toBeDefined(); });
  it("pages/FAQ/FAQTitle", async () => { expect((await import("@/pages/FAQ/FAQTitle")).default).toBeDefined(); });
  it("pages/FAQ/FAQNeedHelp", async () => { expect((await import("@/pages/FAQ/FAQNeedHelp")).default).toBeDefined(); });
  it("pages/FAQ/FAQcard", async () => { expect((await import("@/pages/FAQ/FAQcard")).default).toBeDefined(); });
  it("pages/FAQ/FAQsItems", async () => { expect((await import("@/pages/FAQ/FAQsItems")).default).toBeDefined(); });

  // --- Features sub-pages ---
  it("pages/Features/Features", async () => { expect((await import("@/pages/Features/Features")).default).toBeDefined(); });
  it("pages/Features/FeaturesHeader", async () => { expect((await import("@/pages/Features/FeaturesHeader")).default).toBeDefined(); });
  it("pages/Features/CoreFeaturesCard", async () => { expect((await import("@/pages/Features/CoreFeaturesCard")).default).toBeDefined(); });
  it("pages/Features/AdvancedFeaturesCard", async () => { expect((await import("@/pages/Features/AdvancedFeaturesCard")).default).toBeDefined(); });
  it("pages/Features/BenefitCard", async () => { expect((await import("@/pages/Features/BenefitCard")).default).toBeDefined(); });
  it("pages/Features/VisualShowcaseCard", async () => { expect((await import("@/pages/Features/VisualShowcaseCard")).default).toBeDefined(); });
  it("pages/Features/FeaturesTag", async () => { expect((await import("@/pages/Features/FeaturesTag")).default).toBeDefined(); });

  // --- Register sub-pages ---
  it("pages/Register/RegisterProgressSteps", async () => {
    const m = await import("@/pages/Register/RegisterProgressSteps");
    expect(m.RegisterProgressSteps).toBeDefined();
  });
  it("pages/Register/RoleSelection", async () => { expect((await import("@/pages/Register/RoleSelection")).default).toBeDefined(); });
  it("pages/Register/SecurityFeatures", async () => { expect((await import("@/pages/Register/SecurityFeatures")).default).toBeDefined(); });
  it("pages/Register/Step1Register", async () => { expect((await import("@/pages/Register/Step1Register")).default).toBeDefined(); });
  it("pages/Register/Step2Register", async () => { expect((await import("@/pages/Register/Step2Register")).default).toBeDefined(); });
  it("pages/Register/Step3Register", async () => { expect((await import("@/pages/Register/Step3Register")).default).toBeDefined(); });
  it("pages/Register/Step4Register", async () => { expect((await import("@/pages/Register/Step4Register")).default).toBeDefined(); });

  // --- Dashboard User ---
  it("pages/Dashboard/User/UserDashboard", async () => { expect((await import("@/pages/Dashboard/User/UserDashboard")).default).toBeDefined(); });
  it("pages/Dashboard/User/DepositPage", async () => { expect((await import("@/pages/Dashboard/User/DepositPage")).default).toBeDefined(); });
  it("pages/Dashboard/User/WithdrawPage", async () => { expect((await import("@/pages/Dashboard/User/WithdrawPage")).default).toBeDefined(); });
  it("pages/Dashboard/User/SendMoneyPage", async () => { expect((await import("@/pages/Dashboard/User/SendMoneyPage")).default).toBeDefined(); });
  it("pages/Dashboard/User/TransactionsPage", async () => { expect((await import("@/pages/Dashboard/User/TransactionsPage")).default).toBeDefined(); });
  it("pages/Dashboard/User/UpdatePasswordPage", async () => { expect((await import("@/pages/Dashboard/User/UpdatePasswordPage")).default).toBeDefined(); });

  // --- Dashboard Agent ---
  it("pages/Dashboard/Agent/AgentDashboard", async () => { expect((await import("@/pages/Dashboard/Agent/AgentDashboard")).default).toBeDefined(); });
  it("pages/Dashboard/Agent/AddMoneyPage", async () => { expect((await import("@/pages/Dashboard/Agent/AddMoneyPage")).default).toBeDefined(); });
  it("pages/Dashboard/Agent/WithdrawMoneyPage", async () => { expect((await import("@/pages/Dashboard/Agent/WithdrawMoneyPage")).default).toBeDefined(); });
  it("pages/Dashboard/Agent/TransactionsPage", async () => { expect((await import("@/pages/Dashboard/Agent/TransactionsPage")).default).toBeDefined(); });
  it("pages/Dashboard/Agent/CommissionHistoryPage", async () => { expect((await import("@/pages/Dashboard/Agent/CommissionHistoryPage")).default).toBeDefined(); });

  // --- Dashboard Admin ---
  it("pages/Dashboard/Admin/AdminDashboard", async () => { expect((await import("@/pages/Dashboard/Admin/AdminDashboard")).default).toBeDefined(); });
  it("pages/Dashboard/Admin/ManageUsersPage", async () => { expect((await import("@/pages/Dashboard/Admin/ManageUsersPage")).default).toBeDefined(); });
  it("pages/Dashboard/Admin/ManageAgentsPage", async () => { expect((await import("@/pages/Dashboard/Admin/ManageAgentsPage")).default).toBeDefined(); });
  it("pages/Dashboard/Admin/ManageWalletsPage", async () => { expect((await import("@/pages/Dashboard/Admin/ManageWalletsPage")).default).toBeDefined(); });
  it("pages/Dashboard/Admin/AllTransactionsPage", async () => { expect((await import("@/pages/Dashboard/Admin/AllTransactionsPage")).default).toBeDefined(); });
  it("pages/Dashboard/Admin/SystemConfigPage", async () => { expect((await import("@/pages/Dashboard/Admin/SystemConfigPage")).default).toBeDefined(); });
  it("pages/Dashboard/Admin/CreateAdminPage", async () => { expect((await import("@/pages/Dashboard/Admin/CreateAdminPage")).default).toBeDefined(); });

  // --- Dashboard Profile ---
  it("pages/Dashboard/Profile", async () => { expect((await import("@/pages/Dashboard/Profile")).default).toBeDefined(); });
});
