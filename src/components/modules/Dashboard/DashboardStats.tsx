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

  const stats = [
    {
      title: "Total Balance",
      value: `$${balance.toLocaleString()}`,
      icon: <Wallet className="h-5 w-5" />,
      description: "Available for use",
      iconWrap: "bg-primary/10 text-primary",
    },
    {
      title: "Monthly Income",
      value: `$${income.toLocaleString()}`,
      icon: <ArrowUpRight className="h-5 w-5" />,
      description: income > 0 ? `+$${income.toLocaleString()} this month` : "No income this month",
      iconWrap: "bg-success/12 text-success",
    },
    {
      title: "Monthly Expenses",
      value: `$${expenses.toLocaleString()}`,
      icon: <ArrowDownLeft className="h-5 w-5" />,
      description: expenses > 0 ? `-$${expenses.toLocaleString()} this month` : "No expenses this month",
      iconWrap: "bg-destructive/10 text-destructive",
    },
    {
      title: "Active Cards",
      value: `${totalCards}`,
      icon: <CreditCard className="h-5 w-5" />,
      description: `${virtualCards} virtual, ${physicalCards} physical`,
      iconWrap: "bg-info/10 text-info",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, index) => (
        <Card key={index} className="gap-0">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-lg ${stat.iconWrap}`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">{stat.title}</p>
              <h3 className="text-2xl font-semibold tracking-tight mb-1">{stat.value}</h3>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
