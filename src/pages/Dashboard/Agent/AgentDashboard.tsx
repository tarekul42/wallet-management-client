import SpendingChart from "@/components/modules/Dashboard/SpendingChart";
import TransactionTable from "@/components/modules/Dashboard/TransactionTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, HandCoins, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetDashboardSummaryQuery,
  useGetAgentTransactionHistoryQuery,
} from "@/redux/features/agent/agent.api";
import { useAppSelector } from "@/redux/hook";

const AgentDashboard = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: summaryRes, isLoading: summaryLoading, isError: summaryError } = useGetDashboardSummaryQuery();
  const { data: txRes, isLoading: txLoading, isError: txError } = useGetAgentTransactionHistoryQuery({ limit: 50 });

  const isLoading = summaryLoading || txLoading;
  const hasError = summaryError || txError;
  const summary = summaryRes?.data;
  const txList = txRes?.data ?? [];

  const agentStats = [
    {
      title: "Current Balance",
      value: summary ? `$${(summary.currentBalance).toLocaleString()}` : "$0.00",
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      description: "Available for cash-out",
      color: "bg-primary/10",
    },
    {
      title: "Total Commission",
      value: summary ? `$${(summary.totalCommission).toLocaleString()}` : "$0.00",
      icon: <HandCoins className="h-6 w-6 text-green-600" />,
      description: "Earned all time",
      color: "bg-green-100",
    },
    {
      title: "Active Customers",
      value: summary ? `${summary.activeCustomers}` : "0",
      icon: <Users className="h-6 w-6 text-blue-600" />,
      description: "Unique customers served",
      color: "bg-blue-100",
    },
    {
      title: "Success Rate",
      value: summary ? `${summary.successRate}%` : "0%",
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
      description: "Across all transactions",
      color: "bg-purple-100",
    },
  ];

  const AgentSkeleton = () => (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-80" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
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
          <CardContent className="space-y-4">
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
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

  if (isLoading) return <AgentSkeleton />;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        {hasError && (
          <div className="p-3 mb-4 rounded-lg bg-destructive/10 text-destructive text-sm">
            Some data failed to load. Showing available information.
          </div>
        )}
        <h1 className="text-3xl font-bold">Agent Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back{user?.name ? `, ${user.name}` : ""}! Manage your agent operations.
        </p>
      </div>
        <div className="flex items-center gap-3">
          <Button asChild className="gap-2">
            <Link to="/dashboard/agent/add-money">Process Cash-In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/dashboard/agent/commissions">View Commission History</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agentStats.map((stat, index) => (
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
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-2xl bg-muted/50 border border-dashed flex flex-col items-center justify-center text-center space-y-2">
              <p className="font-semibold">Generate QR Code</p>
              <p className="text-xs text-muted-foreground">
                Let customers scan to pay or cash-out instantly.
              </p>
              <Button size="sm" variant="secondary" className="mt-2">
                Generate
              </Button>
            </div>
            <div className="p-4 rounded-2xl bg-muted/50 border border-dashed flex flex-col items-center justify-center text-center space-y-2">
              <p className="font-semibold">Verify Transaction</p>
              <p className="text-xs text-muted-foreground">
                Check the status of a specific reference ID.
              </p>
              <Button size="sm" variant="secondary" className="mt-2">
                Verify
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <TransactionTable transactions={txList} loading={txLoading} />
    </div>
  );
};

export default AgentDashboard;
