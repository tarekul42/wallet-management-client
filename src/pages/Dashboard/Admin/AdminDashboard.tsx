import DashboardShell from "@/components/modules/Dashboard/DashboardShell";
import SpendingChart from "@/components/modules/Dashboard/SpendingChart";
import TransactionTable from "@/components/modules/Dashboard/TransactionTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, UserCheck, Activity, ShieldAlert } from "lucide-react";
import {
  useGetDashboardStatisticsQuery,
  useGetAllTransactionsQuery,
} from "@/redux/features/admin/admin.api";
import { useAppSelector } from "@/redux/hook";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: statsRes, isLoading: statsLoading, isError: statsError } = useGetDashboardStatisticsQuery();
  const { data: txRes, isLoading: txLoading, isError: txError } = useGetAllTransactionsQuery({ limit: 50 });

  const isLoading = statsLoading || txLoading;
  const hasError = statsError || txError;
  const stats = statsRes?.data;
  const txList = txRes?.data ?? [];

  const formatVolume = (vol: number) => {
    if (vol >= 1_000_000) return `$${(vol / 1_000_000).toFixed(1)}M`;
    if (vol >= 1_000) return `$${(vol / 1_000).toFixed(1)}K`;
    return `$${vol.toFixed(0)}`;
  };

  const adminStats = [
    {
      title: "Total Users",
      value: stats ? `${stats.totalUsers.toLocaleString()}` : "0",
      icon: <Users className="h-6 w-6 text-info" />,
      description: stats ? `+${stats.newUsersThisWeek} new this week` : "",
      color: "bg-info/10",
      iconColor: "text-info",
    },
    {
      title: "Active Agents",
      value: stats ? `${stats.activeAgents.toLocaleString()}` : "0",
      icon: <UserCheck className="h-6 w-6 text-success" />,
      description: "Currently active",
      color: "bg-success/10",
      iconColor: "text-success",
    },
    {
      title: "Total Volume",
      value: stats ? formatVolume(stats.totalVolume) : "$0",
      icon: <Activity className="h-6 w-6 text-primary" />,
      description: "All time successful transactions",
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: "Pending Reports",
      value: stats ? `${stats.pendingReports}` : "0",
      icon: <ShieldAlert className="h-6 w-6 text-destructive" />,
      description: "Agents awaiting approval",
      color: "bg-destructive/10",
      iconColor: "text-destructive",
    },
  ];

  const userDist = stats?.userDistribution;
  const totalDistUsers = userDist
    ? userDist.users + userDist.agents + userDist.admins
    : 0;
  let userPct = 70, agentPct = 15, adminPct = 15;
  if (totalDistUsers > 0) {
    userPct = Math.round((userDist!.users / totalDistUsers) * 100);
    agentPct = Math.round((userDist!.agents / totalDistUsers) * 100);
    adminPct = 100 - userPct - agentPct;
  }

  const distItems = [
    { label: "Users", pct: userPct, color: "bg-primary", value: userDist?.users ?? 0 },
    { label: "Agents", pct: agentPct, color: "bg-success", value: userDist?.agents ?? 0 },
    { label: "Admins", pct: adminPct, color: "bg-chart-4", value: userDist?.admins ?? 0 },
  ];

  const adminSkeleton = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="p-6">
              <Skeleton className="h-12 w-12 rounded-xl mb-4" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Skeleton className="h-48 w-48 rounded-full" />
          </CardContent>
        </Card>
      </div>
      <Card className="shadow-sm">
        <CardHeader>
          <Skeleton className="h-8 w-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    </>
  );

  return (
    <DashboardShell
      title="Admin Dashboard"
      subtitle={`Welcome back${user?.name ? `, ${user.name}` : ""}! System-wide overview and administrative controls.`}
      isLoading={isLoading}
      hasError={hasError}
      skeleton={adminSkeleton}
    >

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <Card key={index} className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SpendingChart title="Platform Transaction Volume" />
        </div>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">User Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[300px]">
            <div
              className="relative w-48 h-48 rounded-full flex items-center justify-center mb-6"
              style={{
                background: `conic-gradient(
                  var(--primary) 0% ${userPct}%,
                  var(--success) ${userPct}% ${userPct + agentPct}%,
                  var(--chart-4) ${userPct + agentPct}% 100%
                )`
              }}
              role="img"
              aria-label={`User distribution: ${userPct}% users, ${agentPct}% agents, ${adminPct}% admins`}
            >
              <div className="w-32 h-32 rounded-full bg-background flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold">{totalDistUsers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground uppercase">Total</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full">
              {distItems.map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1.5">
                    <div className={cn("w-2.5 h-2.5 rounded-full shrink-0", item.color)} />
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold">{item.pct}%</span>
                  <span className="text-[10px] text-muted-foreground">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <TransactionTable transactions={txList} loading={txLoading} />
    </DashboardShell>
  );
};

export default AdminDashboard;
