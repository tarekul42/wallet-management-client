import { Navigate } from "react-router";
import { useAppSelector } from "@/redux/hook";
import { role } from "@/constants/role";

const dashboardRedirect: Record<string, string> = {
  [role.superAdmin]: "/dashboard/admin",
  [role.admin]: "/dashboard/admin",
  [role.agent]: "/dashboard/agent",
  [role.user]: "/dashboard/user",
};

const DashboardIndex = () => {
  const user = useAppSelector((state) => state.auth.user);
  const redirect = dashboardRedirect[user?.role ?? ""] || "/login";
  return <Navigate to={redirect} replace />;
};

export default DashboardIndex;
