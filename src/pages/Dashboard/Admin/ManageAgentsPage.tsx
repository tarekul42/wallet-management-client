import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useGetAgentsQuery, useManageAgentMutation } from "@/redux/features/admin/admin.api";
import { DataTable, type Column } from "@/components/ui/DataTable";
import type { IUserProfile } from "@/types/api";

const APPROVAL_COLOR: Record<string, "secondary" | "outline" | "destructive"> = {
  APPROVED: "secondary",
  PENDING: "outline",
  REJECTED: "destructive",
  SUSPENDED: "destructive",
};

const ManageAgentsPage = () => {
  const { data: agentsRes, isLoading } = useGetAgentsQuery({});
  const [manageAgent] = useManageAgentMutation();
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const agents = (agentsRes?.data ?? []) as IUserProfile[];

  const handleAction = async (agentId: string, action: string) => {
    setActionLoading(`${agentId}-${action}`);
    try {
      const actionMap: Record<string, { action: string; data?: Record<string, unknown> }> = {
        approve: { action: "approval", data: { approvalStatus: "APPROVED", commissionRate: 0.05 } },
        reject: { action: "approval", data: { approvalStatus: "REJECTED" } },
        suspend: { action: "suspend", data: { status: "suspended" } },
        reactivate: { action: "suspend", data: { status: "active" } },
      };
      const config = actionMap[action];
      if (!config) return;
      await manageAgent({ agentId, ...config }).unwrap();
      toast.success(`Agent ${action}ed successfully`);
    } catch {
      toast.error(`Failed to ${action} agent. Please try again.`);
    } finally {
      setActionLoading(null);
    }
  };

  const columns: Column<IUserProfile>[] = [
    {
      key: "name",
      header: "Name",
      render: (a) => <span className="font-medium">{a.name}</span>,
    },
    {
      key: "email",
      header: "Email",
      render: (a) => <span className="text-muted-foreground">{a.email}</span>,
    },
    {
      key: "commission",
      header: "Commission",
      render: (a) => (
        <span>{a.commissionRate != null ? `${(a.commissionRate * 100).toFixed(1)}%` : "—"}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      className: "text-center",
      render: (a) => (
        <Badge variant={APPROVAL_COLOR[a.approvalStatus || "PENDING"] || "outline"}>
          {a.approvalStatus || "PENDING"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-center",
      render: (a) => (
        <div className="flex items-center justify-center gap-2">
          {a.approvalStatus === "PENDING" && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                disabled={actionLoading === `${a._id}-approve`}
                onClick={() => handleAction(a._id, "approve")}
              >
                <CheckCircle className="h-4 w-4 mr-1" /> Approve
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                disabled={actionLoading === `${a._id}-reject`}
                onClick={() => handleAction(a._id, "reject")}
              >
                <XCircle className="h-4 w-4 mr-1" /> Reject
              </Button>
            </>
          )}
          {a.approvalStatus === "APPROVED" && (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              disabled={actionLoading === `${a._id}-suspend`}
              onClick={() => handleAction(a._id, "suspend")}
            >
              <XCircle className="h-4 w-4 mr-1" /> Suspend
            </Button>
          )}
          {a.approvalStatus === "SUSPENDED" && (
            <Button
              variant="ghost"
              size="sm"
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
              disabled={actionLoading === `${a._id}-reactivate`}
              onClick={() => handleAction(a._id, "reactivate")}
            >
              <CheckCircle className="h-4 w-4 mr-1" /> Reactivate
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      title="Manage Agents"
      data={agents}
      columns={columns}
      searchPlaceholder="Search by name or email..."
      searchKeys={["name", "email"]}
      isLoading={isLoading}
      emptyMessage="No agents found matching your search."
    />
  );
};

export default ManageAgentsPage;
