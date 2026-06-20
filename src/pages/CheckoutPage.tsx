import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Wallet,
  Loader2,
  ShoppingBag,
  Info,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetServiceByIdQuery, useBuyServiceMutation } from "@/redux/features/services/services.api";
import { toast } from "sonner";

const CheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: serviceRes, isLoading } = useGetServiceByIdQuery(id || "");
  const [buyService, { isLoading: isBuying }] = useBuyServiceMutation();
  const [amount, setAmount] = useState("");

  const service = serviceRes?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-lg mx-auto px-4">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-64 w-full rounded-xl mb-6" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service not found</h2>
          <Button asChild>
            <Link to="/explore">Back to Explore</Link>
          </Button>
        </div>
      </div>
    );
  }

  const parsedAmount = parseFloat(amount);
  const feeRate = 0.015;
  const fee = parsedAmount > 0 ? parsedAmount * feeRate : 0;
  const total = parsedAmount > 0 ? parsedAmount + fee : 0;

  const handlePurchase = async () => {
    if (!parsedAmount || parsedAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    try {
      await buyService({ serviceId: service._id, amount: parsedAmount }).unwrap();
      toast.success(`Successfully paid $${parsedAmount.toFixed(2)} for ${service.title}`);
      navigate("/dashboard");
    } catch (err: unknown) {
      const msg = (err as { data?: { message?: string } })?.data?.message || "Payment failed. Please try again.";
      toast.error(msg);;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-lg mx-auto px-4">
        <Button variant="ghost" asChild className="mb-8 gap-2 hover:gap-3 transition-all">
          <Link to={`/explore/${id}`}>
            <ArrowLeft className="h-4 w-4" />
            Back to Service
          </Link>
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="overflow-hidden shadow-sm">
            <div className="flex gap-4 p-5 bg-muted/20">
              <div className="h-20 w-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold truncate">{service.title}</h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="text-sm font-medium">{service.rating}</span>
                  <span className="text-xs text-muted-foreground">• {service.category}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{service.description}</p>
              </div>
            </div>

            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment amount ($)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-foreground">$</span>
                  <Input
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-14 text-2xl font-bold pl-8 pr-4"
                    autoFocus
                  />
                </div>
              </div>

              <div className="rounded-xl bg-muted/30 p-4 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service price</span>
                  <span className="font-medium">{service.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction fee (1.5%)</span>
                  <span className="font-medium">${fee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2.5 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                Secured by Wallet Management API
                <Clock className="h-3.5 w-3.5 text-primary ml-2" />
                Instant processing
              </div>

              <Button
                onClick={handlePurchase}
                disabled={isBuying || !amount}
                className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {isBuying ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wallet className="h-5 w-5 mr-2" />
                    Pay ${total.toFixed(2)} with Wallet
                  </>
                )}
              </Button>

              <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
                <Info className="h-3 w-3" />
                Your balance will be deducted immediately
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
            <ShoppingBag className="h-3.5 w-3.5" />
            By completing this purchase, you agree to our Terms of Service
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
