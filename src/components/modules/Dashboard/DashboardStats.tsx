import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft, Wallet, CreditCard } from "lucide-react";

interface StatsProps {
  balance: number;
  income: number;
  expenses: number;
}

const DashboardStats = ({ balance, income, expenses }: StatsProps) => {
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
      icon: <ArrowUpRight className="h-6 w-6 text-green-600" />,
      description: "+12% from last month",
      color: "bg-green-100",
    },
    {
      title: "Monthly Expenses",
      value: `$${expenses.toLocaleString()}`,
      icon: <ArrowDownLeft className="h-6 w-6 text-red-600" />,
      description: "-5% from last month",
      color: "bg-red-100",
    },
    {
      title: "Active Cards",
      value: "3",
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
      description: "2 virtual, 1 physical",
      color: "bg-blue-100",
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
