import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ITransaction } from "@/types/api";

interface SpendingChartProps {
  title?: string;
  transactions?: ITransaction[];
  loading?: boolean;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface TooltipEntry {
  name: string;
  value: number;
  color: string;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipEntry[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border/70 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-medium mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground capitalize">{entry.name}</span>
          </div>
          <span className="font-semibold">${entry.value.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
};

const SpendingChart = ({ title = "Spending Analysis", transactions, loading }: SpendingChartProps) => {
  const chartData = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return DAYS.map((name) => ({ name, income: 0, expenses: 0 }));
    }

    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const dailyMap: Record<string, { income: number; expenses: number }> = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(d.getDate() + i);
      dailyMap[d.toISOString().slice(0, 10)] = { income: 0, expenses: 0 };
    }

    for (const tx of transactions) {
      if (tx.status !== "SUCCESSFUL") continue;
      const key = tx.createdAt ? new Date(tx.createdAt).toISOString().slice(0, 10) : "";
      if (!dailyMap[key]) continue;
      if (tx.type === "CASH_IN" || tx.type === "COMMISSION") {
        dailyMap[key].income += tx.amount;
      } else {
        dailyMap[key].expenses += tx.amount;
      }
    }

    return Object.entries(dailyMap).map(([dateStr, val]) => ({
      name: DAYS[new Date(dateStr).getDay()],
      income: val.income,
      expenses: val.expenses,
    }));
  }, [transactions]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full min-w-0" role="img" aria-label={`${title} chart showing income and expenses over time`}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="var(--destructive)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/50" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={8}
                formatter={(value: string) => (
                  <span className="text-sm text-muted-foreground capitalize">{value}</span>
                )}
              />
              <Area
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="var(--primary)"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorIncome)"
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="var(--destructive)"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorExpenses)"
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;
