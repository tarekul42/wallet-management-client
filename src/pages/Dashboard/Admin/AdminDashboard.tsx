import SpendingChart from "@/components/modules/Dashboard/SpendingChart";
import TransactionTable from "@/components/modules/Dashboard/TransactionTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Activity, ShieldAlert } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetDashboardStatisticsQuery,
  useGetAllTransactionsQuery,
} from "@/redux/features/admin/admin.api";
import { useAppSelector } from "@/redux/hook";

const AdminDashboard = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: statsRes, isLoading: statsLoading } = useGetDashboardStatisticsQuery();
  const { data: txRes, isLoading: txLoading } = useGetAllTransactionsQuery({ limit: 50 });

  const isLoading = statsLoading || txLoading;
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
      icon: <Users className="h-6 w-6 text-blue-600" />,
      description: stats ? `+${stats.newUsersThisWeek} new this week` : "",
      color: "bg-blue-100",
    },
    {
      title: "Active Agents",
      value: stats ? `${stats.activeAgents.toLocaleString()}` : "0",
      icon: <UserCheck className="h-6 w-6 text-green-600" />,
      description: "Currently active",
      color: "bg-green-100",
    },
    {
      title: "Total Volume",
      value: stats ? formatVolume(stats.totalVolume) : "$0",
      icon: <Activity className="h-6 w-6 text-purple-600" />,
      description: "All time successful transactions",
      color: "bg-purple-100",
    },
    {
      title: "Pending Reports",
      value: stats ? `${stats.pendingReports}` : "0",
      icon: <ShieldAlert className="h-6 w-6 text-red-600" />,
      description: "Agents awaiting approval",
      color: "bg-red-100",
    },
  ];

  const userDist = stats?.userDistribution;
  const totalDistUsers = userDist
    ? userDist.users + userDist.agents + userDist.admins
    : 0;
  const userPct = totalDistUsers > 0 ? Math.round((userDist!.users / totalDistUsers) * 100) : 70;
  const agentPct = totalDistUsers > 0 ? Math.round((userDist!.agents / totalDistUsers) * 100) : 15;
  const adminPct = totalDistUsers > 0 ? Math.round((userDist!.admins / totalDistUsers) * 100) : 5;

  const AdminSkeleton = () => (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-80" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-0 shadow-md">
            <CardContent className="p-6">
              <Skeleton className="h-12 w-12 rounded-xl mb-4" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Skeleton className="h-48 w-48 rounded-full" />
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <Skeleton className="h-8 w-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    </div>
  );

  if (isLoading) return <AdminSkeleton />;

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back{user?.name ? `, ${user.name}` : ""}! System-wide overview and administrative controls.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md">
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
          <SpendingChart />
        </div>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">User Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[300px]">
            <div className="relative w-48 h-48 rounded-full border-[16px] border-primary border-r-green-500 border-b-yellow-500 border-l-purple-500 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold">{totalDistUsers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground uppercase">Users</p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 w-full">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs">Regular ({userPct}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs">Agents ({agentPct}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-xs">Merchants (0%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-xs">Admins ({adminPct}%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <TransactionTable transactions={txList} loading={txLoading} />
    </div>
  );
};

export default AdminDashboard;
