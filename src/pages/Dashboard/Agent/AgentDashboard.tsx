import DashboardShell from "@/components/modules/Dashboard/DashboardShell";
import SpendingChart from "@/components/modules/Dashboard/SpendingChart";
import TransactionTable from "@/components/modules/Dashboard/TransactionTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, HandCoins, Users, TrendingUp, ArrowDownFromLine, ArrowUpFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
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
      icon: <DollarSign className="h-6 w-6" />,
      description: "Available for cash-out",
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: "Total Commission",
      value: summary ? `$${(summary.totalCommission).toLocaleString()}` : "$0.00",
      icon: <HandCoins className="h-6 w-6 text-success" />,
      description: "Earned all time",
      color: "bg-success/10",
      iconColor: "text-success",
    },
    {
      title: "Active Customers",
      value: summary ? `${summary.activeCustomers}` : "0",
      icon: <Users className="h-6 w-6 text-info" />,
      description: "Unique customers served",
      color: "bg-info/10",
      iconColor: "text-info",
    },
    {
      title: "Success Rate",
      value: summary ? `${summary.successRate}%` : "0%",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      description: "Across all transactions",
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
  ];

  const agentSkeleton = (
    <>
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
    </>
  );

  return (
    <DashboardShell
      title="Agent Dashboard"
      subtitle={`Welcome back${user?.name ? `, ${user.name}` : ""}! Manage your agent operations.`}
      isLoading={isLoading}
      hasError={hasError}
      skeleton={agentSkeleton}
      actions={
        <>
          <Button asChild className="gap-2">
            <Link to="/dashboard/agent/add-money">
              <ArrowDownFromLine className="h-4 w-4" />
              Process Cash-In
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/dashboard/agent/commissions">
              <HandCoins className="h-4 w-4" />
              Commissions
            </Link>
          </Button>
        </>
      }
    >
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
          <SpendingChart title="Agent Transaction Volume" />
        </div>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              asChild
              variant="outline"
              className="w-full h-auto flex-col items-center gap-2 py-6 rounded-2xl border-2 border-dashed hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <Link to="/dashboard/agent/add-money">
                <ArrowDownFromLine className="h-6 w-6 text-primary" />
                <span className="font-semibold">Cash-In to User</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Add money to a user&apos;s account
                </span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full h-auto flex-col items-center gap-2 py-6 rounded-2xl border-2 border-dashed hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <Link to="/dashboard/agent/withdraw-money">
                <ArrowUpFromLine className="h-6 w-6 text-primary" />
                <span className="font-semibold">Cash-Out from User</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Withdraw money from a user&apos;s account
                </span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <TransactionTable transactions={txList} loading={txLoading} />
    </DashboardShell>
  );
};

export default AgentDashboard;
