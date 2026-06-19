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
import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSpendingOverviewQuery } from "@/redux/features/dashboard/dashboard.api";


interface SpendingChartProps {
  title?: string;
}

const defaultData = [
  { name: "Mon", income: 0, expenses: 0 },
  { name: "Tue", income: 0, expenses: 0 },
  { name: "Wed", income: 0, expenses: 0 },
  { name: "Thu", income: 0, expenses: 0 },
  { name: "Fri", income: 0, expenses: 0 },
  { name: "Sat", income: 0, expenses: 0 },
  { name: "Sun", income: 0, expenses: 0 },
];

interface TooltipEntry {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
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

const SpendingChart = ({ title = "Spending Analysis" }: SpendingChartProps) => {
  const { data: chartRes, isLoading } = useGetSpendingOverviewQuery();
  const chartData = chartRes?.data ?? defaultData;

  const hasData = chartData.some((d) => d.income > 0 || d.expenses > 0);

  if (isLoading) {
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
        {!hasData ? (
          <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
            <div className="p-3 rounded-full bg-muted mb-4"><BarChart3 className="h-7 w-7 opacity-50" /></div>
            <p className="font-medium text-foreground">No spending data yet</p>
            <p className="text-sm mt-1">Complete a transaction to see your spending analysis</p>
          </div>
        ) : (
          <div className="h-[300px] w-full" role="img" aria-label={`${title} chart showing income and expenses over time`}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
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
        )}
      </CardContent>
    </Card>
  );
};

export default SpendingChart;
