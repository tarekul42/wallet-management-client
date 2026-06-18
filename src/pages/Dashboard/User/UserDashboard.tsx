import DashboardStats from "@/components/modules/Dashboard/DashboardStats";
import SpendingChart from "@/components/modules/Dashboard/SpendingChart";
import TransactionTable from "@/components/modules/Dashboard/TransactionTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { SendHorizontal, Wallet, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus as PlusIcon } from "lucide-react";
import {
  useGetAccountBalanceQuery,
  useGetTransactionHistoryQuery,
} from "@/redux/features/user/user.api";
import { useGetMyCardsQuery } from "@/redux/features/cards/cards.api";
import { useAppSelector } from "@/redux/hook";
import { useMemo } from "react";

const UserDashboard = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { data: balanceRes, isLoading: balanceLoading, isError: balanceError } = useGetAccountBalanceQuery();
  const { data: txRes, isLoading: txLoading, isError: txError } = useGetTransactionHistoryQuery({ limit: 50 });

  const isLoading = balanceLoading || txLoading;
  const hasError = balanceError || txError;

  const balance = balanceRes?.data?.balance ?? 0;

  const { income, expenses } = useMemo(() => {
    const txns = txRes?.data ?? [];
    let inc = 0;
    let exp = 0;
    for (const t of txns) {
      if (t.status !== "SUCCESSFUL") continue;
      if (t.type === "CASH_IN") inc += t.amount;
      else if (t.type === "COMMISSION") inc += t.amount;
      else exp += t.amount;
    }
    return { income: inc, expenses: exp };
  }, [txRes]);

  const txList = txRes?.data ?? [];
  const { data: cardsRes } = useGetMyCardsQuery();
  const cards = cardsRes?.data ?? [];
  const primaryCard = cards.find((c) => c.type === "VIRTUAL" && c.status === "ACTIVE") || cards[0];

  const DashboardSkeleton = () => (
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
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-3xl" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
          </div>
        </div>
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

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        {hasError && (
          <div className="p-3 mb-4 rounded-lg bg-destructive/10 text-destructive text-sm">
            Some data failed to load. Showing available information.
          </div>
        )}
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back{user?.name ? `, ${user.name}` : ""}! Manage your finances and transactions.
        </p>
      </div>
        <div className="flex items-center gap-3">
          <Link to="/dashboard/user/deposit">
            <Button className="gap-2">
              <PlusIcon className="h-4 w-4" />
              Add Money
            </Button>
          </Link>
          <Link to="/dashboard/user/send-money">
            <Button variant="outline" className="gap-2">
              <SendHorizontal className="h-4 w-4" />
              Send Money
            </Button>
          </Link>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DashboardStats balance={balance} income={income} expenses={expenses} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SpendingChart />
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-primary text-primary-foreground p-6 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-sm opacity-80 mb-6 font-medium uppercase tracking-wider">
                {primaryCard?.type === "PHYSICAL" ? "Physical Card" : "Virtual Card"}
              </p>
              <h3 className="text-2xl font-mono mb-8">
                {primaryCard ? `**** **** **** ${primaryCard.lastFourDigits}` : "No card available"}
              </h3>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs opacity-60 uppercase mb-1">
                    Card Holder
                  </p>
                  <p className="font-medium">{primaryCard?.cardholderName || user?.name || "—"}</p>
                </div>
                <div>
                  <p className="text-xs opacity-60 uppercase mb-1">Expires</p>
                  <p className="font-medium">{primaryCard?.expiryDate || "—"}</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button asChild variant="outline" className="h-24 flex-col gap-3 rounded-2xl border-2 hover:border-primary/50 hover:bg-primary/5 transition-all">
              <Link to="/dashboard/user/transactions">
                <Wallet className="h-6 w-6 text-primary" />
                <span>Transactions</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-24 flex-col gap-3 rounded-2xl border-2 hover:border-primary/50 hover:bg-primary/5 transition-all">
              <Link to="/dashboard/user/deposit">
                <CreditCard className="h-6 w-6 text-primary" />
                <span>Deposit</span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <TransactionTable transactions={txList} loading={txLoading} />
      </motion.div>
    </div>
  );
};

export default UserDashboard;
