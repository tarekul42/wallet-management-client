import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ShoppingBag, ExternalLink } from "lucide-react";
import type { PurchaseItem } from "@/redux/features/services/services.api";

interface MyPurchasesProps {
  purchases: PurchaseItem[];
  loading: boolean;
}

const MyPurchases = ({ purchases, loading }: MyPurchasesProps) => {
  if (loading) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (purchases.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            My Purchases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground mb-2">No purchases yet</p>
            <Button asChild variant="outline" size="sm">
              <Link to="/explore">Browse Services</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          My Purchases
        </CardTitle>
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <Link to="/explore">
            Browse
            <ExternalLink className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {purchases.slice(0, 4).map((p) => (
          <div
            key={p._id}
            className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              {p.service?.image ? (
                <img
                  src={p.service.image}
                  alt={p.service.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-muted-foreground/40">
                  <ShoppingBag className="h-5 w-5" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {p.service?.title || "Service"}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(p.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-semibold text-sm">${p.amount.toFixed(2)}</p>
              {p.fee > 0 && (
                <p className="text-[10px] text-muted-foreground">
                  +${p.fee.toFixed(2)} fee
                </p>
              )}
            </div>
          </div>
        ))}
        {purchases.length > 4 && (
          <div className="text-center pt-1">
            <Button asChild variant="link" size="sm">
              <Link to="/dashboard/user/transactions">
                View all {purchases.length} purchases
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyPurchases;
