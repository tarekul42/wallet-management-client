import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface DashboardShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  isLoading?: boolean;
  hasError?: boolean;
  actions?: ReactNode;
  skeleton?: ReactNode;
}

const DefaultSkeleton = () => (
  <div className="space-y-8 pb-12">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-80" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="border-0 shadow-md">
          <CardContent className="p-6">
            <Skeleton className="h-12 w-12 rounded-xl mb-4" />
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const DashboardShell = ({
  title,
  subtitle,
  children,
  isLoading = false,
  hasError = false,
  actions,
  skeleton,
}: DashboardShellProps) => {
  if (isLoading) {
    return <div className="space-y-8 pb-12">{skeleton || <DefaultSkeleton />}</div>;
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {hasError && (
            <div
              className="p-3 mb-4 rounded-lg bg-destructive/10 text-destructive text-sm"
              role="alert"
            >
              Some data failed to load. Showing available information.
            </div>
          )}
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default DashboardShell;
