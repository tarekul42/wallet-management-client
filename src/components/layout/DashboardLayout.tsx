import { Outlet, useLocation, Navigate } from "react-router";
import Sidebar from "./Sidebar";
import { useAppSelector } from "@/redux/hook";
import { role } from "@/constants/role";

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

  const segment = pathname.split("/")[2];
  const allowedRoles = segment ? segmentAccess[segment] : null;

  if (!user?.role) return null;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const redirect = dashboardRedirect[user.role] || "/login";
    return <Navigate to={redirect} replace />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
