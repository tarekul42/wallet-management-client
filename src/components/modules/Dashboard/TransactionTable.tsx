import { useState, useMemo } from "react";
import {
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ITransaction } from "@/types/api";

const TYPE_LABELS: Record<string, string> = {
  SEND_MONEY: "Send Money",
  WITHDRAW: "Withdraw",
  CASH_IN: "Cash In",
  CASH_OUT: "Cash Out",
  COMMISSION: "Commission",
};

const STATUS_VARIANT: Record<string, "secondary" | "outline" | "destructive"> = {
  SUCCESSFUL: "secondary",
  PENDING: "outline",
  FAILED: "destructive",
  REVERSED: "destructive",
};

const isCredit = (type: string) =>
  type === "CASH_IN" || type === "COMMISSION";

type SortField = "type" | "amount" | "date" | "status";
type SortDir = "asc" | "desc";

interface TransactionTableProps {
  transactions?: ITransaction[];
  loading?: boolean;
}

const TransactionTable = ({ transactions = [], loading = false }: TransactionTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const itemsPerPage = 5;

  const filteredTransactions = useMemo(() => {
    const list = transactions.filter((t) => {
      const typeLabel = TYPE_LABELS[t.type] || t.type;
      const matchesSearch =
        typeLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.referenceId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    list.sort((a, b) => {
      let cmp = 0;
      if (sortField === "date") cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      else if (sortField === "amount") cmp = a.amount - b.amount;
      else if (sortField === "type") cmp = TYPE_LABELS[a.type]?.localeCompare(TYPE_LABELS[b.type] || a.type) || 0;
      else if (sortField === "status") cmp = a.status.localeCompare(b.status);
      return sortDir === "desc" ? -cmp : cmp;
    });

    return list;
  }, [transactions, searchTerm, statusFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("desc"); }
  };

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th className="px-6 py-4 font-medium cursor-pointer select-none hover:text-foreground transition-colors" onClick={() => toggleSort(field)}>
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown className={cn("h-3 w-3", sortField === field ? "text-primary" : "opacity-30")} />
      </div>
    </th>
  );

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <CardTitle className="text-xl">Recent Transactions</CardTitle>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-9 h-9"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              className="bg-background border rounded-md px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-primary/20 h-9"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              aria-label="Filter by status"
            >
              <option value="All">All Status</option>
              <option value="SUCCESSFUL">Successful</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
              <tr>
                <SortHeader field="type">Type</SortHeader>
                <th className="px-6 py-4 font-medium">Reference</th>
                <SortHeader field="date">Date</SortHeader>
                <SortHeader field="amount">Amount</SortHeader>
                <SortHeader field="status">Status</SortHeader>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    Loading transactions...
                  </td>
                </tr>
              ) : paginatedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No transactions found
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((t) => (
                  <tr key={t._id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "p-2 rounded-full shrink-0",
                            isCredit(t.type)
                              ? "bg-success/10 text-success"
                              : "bg-destructive/10 text-destructive"
                          )}
                        >
                          {isCredit(t.type) ? (
                            <ArrowDownLeft className="h-4 w-4" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4" />
                          )}
                        </div>
                        <span className="font-medium">
                          {TYPE_LABELS[t.type] || t.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-xs font-mono">
                        {t.referenceId.slice(0, 8)}...
                      </p>
                      {t.description && (
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {t.description}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                      {formatDate(t.createdAt)}
                    </td>
                    <td
                      className={cn(
                        "px-6 py-4 text-right font-bold whitespace-nowrap",
                        isCredit(t.type) ? "text-success" : "text-foreground"
                      )}
                    >
                      {isCredit(t.type) ? "+" : "-"}$
                      {t.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        variant={STATUS_VARIANT[t.status] || "outline"}
                        className="font-medium"
                      >
                        {t.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile card view */}
        <div className="md:hidden space-y-3 p-4">
          {loading ? (
            <p className="text-center text-muted-foreground py-8">Loading transactions...</p>
          ) : paginatedTransactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No transactions found</p>
          ) : (
            paginatedTransactions.map((t) => (
              <Card key={t._id} className="border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "p-2 rounded-full shrink-0",
                          isCredit(t.type)
                              ? "bg-success/10 text-success"
                              : "bg-destructive/10 text-destructive"
                        )}
                      >
                        {isCredit(t.type) ? (
                          <ArrowDownLeft className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{TYPE_LABELS[t.type] || t.type}</p>
                        <p className="text-xs text-muted-foreground font-mono">{t.referenceId.slice(0, 8)}...</p>
                      </div>
                    </div>
                    <Badge variant={STATUS_VARIANT[t.status] || "outline"} className="text-xs">
                      {t.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{formatDate(t.createdAt)}</span>
                    <span className={cn("font-bold", isCredit(t.type) ? "text-success" : "")}>
                      {isCredit(t.type) ? "+" : "-"}$ {t.amount.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <p className="text-xs text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of{" "}
              {filteredTransactions.length}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground min-w-[4ch] text-center">
                {currentPage}/{totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
