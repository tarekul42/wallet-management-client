import DashboardShell from "@/components/modules/Dashboard/DashboardShell";
import DashboardStats from "@/components/modules/Dashboard/DashboardStats";
import SpendingChart from "@/components/modules/Dashboard/SpendingChart";
import TransactionTable from "@/components/modules/Dashboard/TransactionTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { SendHorizontal, PlusIcon, Copy, Snowflake, CreditCard, Wallet } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  useGetAccountBalanceQuery,
  useGetTransactionHistoryQuery,
} from "@/redux/features/user/user.api";
import { useGetMyCardsQuery } from "@/redux/features/cards/cards.api";
import { useAppSelector } from "@/redux/hook";
import { useMemo, useState, useCallback } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const UserDashboard = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [cardFrozen, setCardFrozen] = useState(false);

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

  const handleCopyCard = useCallback(() => {
    if (primaryCard?.lastFourDigits) {
      navigator.clipboard.writeText(`**** **** **** ${primaryCard.lastFourDigits}`).then(() => {
        toast.success("Card number copied to clipboard");
      }).catch(() => {
        toast.error("Failed to copy card number");
      });
    }
  }, [primaryCard]);

  const handleToggleFreeze = useCallback(() => {
    setCardFrozen((prev) => !prev);
    toast.success(cardFrozen ? "Card unfrozen" : "Card frozen");
  }, [cardFrozen]);

  const userSkeleton = (
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
    </>
  );

  return (
    <DashboardShell
      title="User Dashboard"
      subtitle={`Welcome back${user?.name ? `, ${user.name}` : ""}! Manage your finances and transactions.`}
      isLoading={isLoading}
      hasError={hasError}
      skeleton={userSkeleton}
      actions={
        <>
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
        </>
      }
    >
      <DashboardStats balance={balance} income={income} expenses={expenses} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SpendingChart />
        </div>

        <div className="space-y-6">
          <div
            className={cn(
              "p-6 rounded-3xl shadow-xl relative overflow-hidden transition-all",
              cardFrozen
                ? "bg-blue-900 text-blue-50"
                : "bg-primary text-primary-foreground"
            )}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs opacity-80 font-medium uppercase tracking-wider">
                  {primaryCard?.type === "PHYSICAL" ? "Physical Card" : "Virtual Card"}
                </p>
                {cardFrozen && (
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium">
                    Frozen
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-mono mb-8 tracking-wider">
                {primaryCard ? `**** **** **** ${primaryCard.lastFourDigits}` : "No card available"}
              </h3>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-[10px] opacity-60 uppercase mb-1 tracking-wide">
                    Card Holder
                  </p>
                  <p className="font-medium text-sm">{primaryCard?.cardholderName || user?.name || "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] opacity-60 uppercase mb-1 tracking-wide">Expires</p>
                  <p className="font-medium text-sm">{primaryCard?.expiryDate || "—"}</p>
                </div>
              </div>
              {primaryCard && (
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="gap-2 text-xs bg-white/20 hover:bg-white/30 text-inherit border-0"
                    onClick={handleCopyCard}
                    aria-label="Copy card number"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className={cn(
                      "gap-2 text-xs bg-white/20 hover:bg-white/30 text-inherit border-0",
                      cardFrozen && "bg-success/30 hover:bg-success/40"
                    )}
                    onClick={handleToggleFreeze}
                    aria-label={cardFrozen ? "Unfreeze card" : "Freeze card"}
                  >
                    <Snowflake className="h-3.5 w-3.5" />
                    {cardFrozen ? "Unfreeze" : "Freeze"}
                  </Button>
                </div>
              )}
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
        </div>
      </div>

      <TransactionTable transactions={txList} loading={txLoading} />
    </DashboardShell>
  );
};

export default UserDashboard;
