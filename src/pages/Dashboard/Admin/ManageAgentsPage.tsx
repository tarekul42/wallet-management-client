import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useGetAgentsQuery, useManageAgentMutation } from "@/redux/features/admin/admin.api";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const itemsPerPage = 10;

  const agents = useMemo(() => (agentsRes?.data ?? []) as IUserProfile[], [agentsRes]);

  const filteredAgents = useMemo(() => {
    return agents.filter((a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [agents, searchTerm]);

  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      toast.success(`Agent ${action === "approve" ? "approved" : action === "reject" ? "rejected" : action === "suspend" ? "suspended" : "reactivated"} successfully`);
    } catch {
      toast.error(`Failed to ${action} agent. Please try again.`);
    } finally {
      setActionLoading(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-10 w-64" />
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full mb-3" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manage Agents</h1>
          <p className="text-muted-foreground mt-1">{agents.length} total agents</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl">All Agents</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Commission</th>
                  <th className="px-6 py-4 font-medium text-center">Status</th>
                  <th className="px-6 py-4 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {paginatedAgents.map((a) => (
                  <tr key={a._id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-medium">{a.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{a.email}</td>
                    <td className="px-6 py-4">
                      {a.commissionRate != null
                        ? `${(a.commissionRate * 100).toFixed(1)}%`
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant={APPROVAL_COLOR[a.approvalStatus || "PENDING"] || "outline"}>
                        {a.approvalStatus || "PENDING"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No agents found matching your search.
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <p className="text-xs text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAgents.length)} of {filteredAgents.length}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageAgentsPage;
