import { useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { useAppSelector } from "@/redux/hook";
import { role } from "@/constants/role";
import { Button } from "@/components/ui/button";

const segmentAccess: Record<string, string[]> = {
  user: [role.superAdmin, role.admin, role.user],
  agent: [role.superAdmin, role.admin, role.agent],
  admin: [role.superAdmin, role.admin],
};

const dashboardRedirect: Record<string, string> = {
  [role.superAdmin]: "/dashboard/admin",
  [role.admin]: "/dashboard/admin",
  [role.agent]: "/dashboard/agent",
  [role.user]: "/dashboard/user",
};

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const user = useAppSelector((state) => state.auth.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const segment = pathname.split("/")[2];
  const allowedRoles = segment ? segmentAccess[segment] : null;

  if (!user?.role) return null;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const redirect = dashboardRedirect[user.role] || "/login";
    return <Navigate to={redirect} replace />;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main id="main-content" className="flex-1 overflow-y-auto bg-background">
        {/* Mobile header */}
        <div className="md:hidden flex items-center h-14 px-4 border-b bg-background sticky top-0 z-30">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 mr-2"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-semibold text-sm">Dashboard</span>
        </div>

        <div className="p-4 md:p-8 xl:p-12 2xl:p-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
