import { Navigate } from "react-router";
import { useAppSelector } from "@/redux/hook";
import { role } from "@/constants/role";
import type { ReactNode } from "react";

const roleHierarchy: Record<string, string[]> = {
  [role.superAdmin]: [role.superAdmin, role.admin, role.agent, role.user],
  [role.admin]: [role.admin, role.agent, role.user],
  [role.agent]: [role.agent, role.user],
  [role.user]: [role.user],
};

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
}

const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user?.role) {
    return <Navigate to="/login" replace />;
  }

  const userAccess = roleHierarchy[user.role] || [user.role];
  const hasAccess = allowedRoles.some((r) => userAccess.includes(r));

  if (!hasAccess) {
    const dashboardMap: Record<string, string> = {
      [role.superAdmin]: "/dashboard/admin",
      [role.admin]: "/dashboard/admin",
      [role.agent]: "/dashboard/agent",
      [role.user]: "/dashboard/user",
    };
    return <Navigate to={dashboardMap[user.role] || "/login"} replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;
