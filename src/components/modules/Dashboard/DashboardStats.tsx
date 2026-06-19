import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft, Wallet, CreditCard } from "lucide-react";
import { useGetMyCardsQuery } from "@/redux/features/cards/cards.api";

interface StatsProps {
  balance: number;
  income: number;
  expenses: number;
}

const DashboardStats = ({ balance, income, expenses }: StatsProps) => {
  const { data: cardsRes } = useGetMyCardsQuery();
  const cards = cardsRes?.data ?? [];
  const virtualCards = cards.filter((c) => c.type === "VIRTUAL" && c.status === "ACTIVE").length;
  const physicalCards = cards.filter((c) => c.type === "PHYSICAL" && c.status === "ACTIVE").length;
  const totalCards = cards.filter((c) => c.status === "ACTIVE").length;

  const incomeChange = income > 0 ? "+" : "";
  const expenseChange = expenses > 0 ? "" : "";

  const stats = [
    {
      title: "Total Balance",
      value: `$${balance.toLocaleString()}`,
      icon: <Wallet className="h-6 w-6 text-primary" />,
      description: "Available for use",
      color: "bg-primary/10",
    },
    {
      title: "Monthly Income",
      value: `$${income.toLocaleString()}`,
      icon: <ArrowUpRight className="h-6 w-6 text-success" />,
      description: income > 0 ? `${incomeChange}$${income.toLocaleString()} this month` : "No income this month",
      color: "bg-success/10",
    },
    {
      title: "Monthly Expenses",
      value: `$${expenses.toLocaleString()}`,
      icon: <ArrowDownLeft className="h-6 w-6 text-destructive" />,
      description: expenses > 0 ? `${expenseChange}$${expenses.toLocaleString()} this month` : "No expenses this month",
      color: "bg-destructive/10",
    },
    {
      title: "Active Cards",
      value: `${totalCards}`,
      icon: <CreditCard className="h-6 w-6 text-info" />,
      description: `${virtualCards} virtual, ${physicalCards} physical`,
      color: "bg-info/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
