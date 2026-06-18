import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useWithdrawMoneyMutation } from "@/redux/features/user/user.api";

const withdrawSchema = z.object({
  amount: z.coerce.number().min(0.01, "Minimum withdrawal is $0.01").max(1000000, "Maximum withdrawal is $1,000,000"),
});

const WithdrawPage = () => {
  const [withdrawMoney, { isLoading }] = useWithdrawMoneyMutation();

  type FormData = z.infer<typeof withdrawSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(withdrawSchema) as Resolver<FormData>,
    defaultValues: { amount: undefined },
  });

  const onSubmit = async (data: z.infer<typeof withdrawSchema>) => {
    try {
      await withdrawMoney({ amount: data.amount }).unwrap();
      toast.success(`Successfully withdrew $${data.amount.toFixed(2)}`);
      form.reset();
    } catch {
      toast.error("Failed to withdraw money. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold">Withdraw Money</h1>
        <p className="text-muted-foreground mt-1">Withdraw funds from your wallet</p>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5 text-red-600" />
            Withdraw Funds
          </CardTitle>
          <CardDescription>Enter the amount you want to withdraw</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                        <Input type="number" step="0.01" min="0.01" placeholder="0.00" className="pl-8 h-12 text-lg" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
                ) : (
                  "Withdraw Now"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WithdrawPage;
