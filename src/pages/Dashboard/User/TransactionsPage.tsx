import TransactionTable from "@/components/modules/Dashboard/TransactionTable";
import { useGetTransactionHistoryQuery } from "@/redux/features/user/user.api";

const TransactionsPage = () => {
  const { data: txRes, isLoading } = useGetTransactionHistoryQuery({ limit: 100 });
  const txList = txRes?.data ?? [];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold">Transaction History</h1>
        <p className="text-muted-foreground mt-1">View all your past transactions</p>
      </div>
      <TransactionTable transactions={txList} loading={isLoading} />
    </div>
  );
};

export default TransactionsPage;
