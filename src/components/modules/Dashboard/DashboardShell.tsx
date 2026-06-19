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
  <div className="space-y-6 pb-12">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-80" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-9 w-32" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-5">
            <Skeleton className="h-11 w-11 rounded-lg mb-4" />
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-7 w-32" />
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
    return <div className="space-y-6 pb-12">{skeleton || <DefaultSkeleton />}</div>;
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {hasError && (
            <div
              className="p-3 mb-4 rounded-lg bg-destructive/10 text-destructive text-sm border border-destructive/20"
              role="alert"
            >
              Some data failed to load. Showing available information.
            </div>
          )}
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        </div>
        {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default DashboardShell;
