import { useState } from "react";
import { Ban, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useGetUsersQuery, useManageUserMutation } from "@/redux/features/admin/admin.api";
import { DataTable, type Column } from "@/components/ui/DataTable";
import type { IUserProfile } from "@/types/api";

const STATUS_COLOR: Record<string, "secondary" | "destructive" | "outline"> = {
  ACTIVE: "secondary",
  BLOCKED: "destructive",
  INACTIVE: "outline",
};

const ManageUsersPage = () => {
  const { data: usersRes, isLoading } = useGetUsersQuery({});
  const [manageUser] = useManageUserMutation();
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const users = (usersRes?.data ?? []) as IUserProfile[];

  const handleAction = async (userId: string, action: "block" | "unblock") => {
    setActionLoading(`${userId}-${action}`);
    try {
      await manageUser({ userId, action }).unwrap();
      toast.success(`User ${action === "block" ? "blocked" : "unblocked"} successfully`);
    } catch {
      toast.error(`Failed to ${action} user. Please try again.`);
    } finally {
      setActionLoading(null);
    }
  };

  const columns: Column<IUserProfile>[] = [
    {
      key: "name",
      header: "Name",
      render: (u) => <span className="font-medium">{u.name}</span>,
    },
    {
      key: "email",
      header: "Email",
      render: (u) => <span className="text-muted-foreground">{u.email}</span>,
    },
    {
      key: "role",
      header: "Role",
      render: (u) => <Badge variant="outline">{u.role}</Badge>,
    },
    {
      key: "status",
      header: "Status",
      className: "text-center",
      render: (u) => (
        <Badge variant={STATUS_COLOR[u.isActive] || "outline"}>{u.isActive}</Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-center",
      render: (u) => (
        <div className="flex items-center justify-center gap-2">
          {u.isActive === "ACTIVE" ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              disabled={actionLoading === `${u._id}-block`}
              onClick={() => handleAction(u._id, "block")}
            >
              <Ban className="h-4 w-4 mr-1" /> Block
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
              disabled={actionLoading === `${u._id}-unblock`}
              onClick={() => handleAction(u._id, "unblock")}
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
      title="Manage Users"
      data={users}
      columns={columns}
      searchPlaceholder="Search by name or email..."
      searchKeys={["name", "email"]}
      isLoading={isLoading}
      emptyMessage="No users found matching your search."
    />
  );
};

export default ManageUsersPage;
