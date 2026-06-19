import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Ban, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useGetUsersQuery, useManageUserMutation } from "@/redux/features/admin/admin.api";
import type { IUserProfile } from "@/types/api";

const STATUS_COLOR: Record<string, "secondary" | "destructive" | "outline"> = {
  ACTIVE: "secondary",
  BLOCKED: "destructive",
  INACTIVE: "outline",
};

const ManageUsersPage = () => {
  const { data: usersRes, isLoading } = useGetUsersQuery({});
  const [manageUser] = useManageUserMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const itemsPerPage = 10;

  const users = useMemo(() => (usersRes?.data ?? []) as IUserProfile[], [usersRes]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  if (isLoading) {
    return (
      <div className="space-y-6 ">
        <Skeleton className="h-10 w-64" />
        <Card className="shadow-sm">
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
    <div className="space-y-6 ">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="text-muted-foreground mt-1">{users.length} total users</p>
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

      <Card className="shadow-sm">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl">All Users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium text-center">Status</th>
                  <th className="px-6 py-4 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {paginatedUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-medium">{u.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{u.email}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline">{u.role}</Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant={STATUS_COLOR[u.isActive] || "outline"}>
                        {u.isActive}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No users found matching your search.
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <p className="text-xs text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length}
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

export default ManageUsersPage;
