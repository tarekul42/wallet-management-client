import { useState } from "react";
import { Ban, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useGetWalletsQuery, useManageWalletMutation } from "@/redux/features/admin/admin.api";
import { DataTable, type Column } from "@/components/ui/DataTable";
import type { IWallet } from "@/types/api";

const STATUS_COLOR: Record<string, "secondary" | "destructive"> = {
  ACTIVE: "secondary",
  BLOCKED: "destructive",
};

const ManageWalletsPage = () => {
  const { data: walletsRes, isLoading } = useGetWalletsQuery();
  const [manageWallet] = useManageWalletMutation();
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const wallets = (walletsRes?.data ?? []) as IWallet[];

  const handleAction = async (walletId: string, action: "block" | "unblock") => {
    setActionLoading(`${walletId}-${action}`);
    try {
      await manageWallet({ walletId, action }).unwrap();
      toast.success(`Wallet ${action === "block" ? "blocked" : "unblocked"} successfully`);
    } catch {
      toast.error(`Failed to ${action} wallet. Please try again.`);
    } finally {
      setActionLoading(null);
    }
  };

  const columns: Column<IWallet>[] = [
    {
      key: "owner",
      header: "Owner ID",
      render: (w) => <span className="font-mono text-xs font-medium">{w.owner}</span>,
    },
    {
      key: "balance",
      header: "Balance",
      render: (w) => <span className="font-medium">${w.balance.toFixed(2)}</span>,
    },
    {
      key: "status",
      header: "Status",
      className: "text-center",
      render: (w) => (
        <Badge variant={STATUS_COLOR[w.status] || "outline"}>{w.status}</Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-center",
      render: (w) => (
        <div className="flex items-center justify-center gap-2">
          {w.status === "ACTIVE" ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              disabled={actionLoading === `${w._id}-block`}
              onClick={() => handleAction(w._id, "block")}
            >
              <Ban className="h-4 w-4 mr-1" /> Block
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
              disabled={actionLoading === `${w._id}-unblock`}
              onClick={() => handleAction(w._id, "unblock")}
            >
              <CheckCircle className="h-4 w-4 mr-1" /> Unblock
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      title="Manage Wallets"
      data={wallets}
      columns={columns}
      searchPlaceholder="Search by owner ID..."
      searchKeys={["owner"]}
      isLoading={isLoading}
      emptyMessage="No wallets found."
    />
  );
};

export default ManageWalletsPage;
