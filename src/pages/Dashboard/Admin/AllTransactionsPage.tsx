import TransactionTable from "@/components/modules/Dashboard/TransactionTable";
import { useGetAllTransactionsQuery } from "@/redux/features/admin/admin.api";

const AllTransactionsPage = () => {
  const { data: txRes, isLoading } = useGetAllTransactionsQuery({ limit: 100 });
  const txList = txRes?.data ?? [];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold">All Transactions</h1>
        <p className="text-muted-foreground mt-1">View every transaction across the system</p>
      </div>
      <TransactionTable transactions={txList} loading={isLoading} />
    </div>
  );
};

export default AllTransactionsPage;
