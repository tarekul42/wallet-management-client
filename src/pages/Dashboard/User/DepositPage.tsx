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
import { ArrowDownLeft, Loader2 } from "lucide-react";
import { useDepositMoneyMutation } from "@/redux/features/user/user.api";

const depositSchema = z.object({
  amount: z.coerce.number().min(0.01, "Minimum deposit is $0.01").max(1000000, "Maximum deposit is $1,000,000"),
});

const DepositPage = () => {
  const [depositMoney, { isLoading }] = useDepositMoneyMutation();

  type FormData = z.infer<typeof depositSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(depositSchema) as Resolver<FormData>,
    defaultValues: { amount: undefined },
  });

  const onSubmit = async (data: z.infer<typeof depositSchema>) => {
    try {
      await depositMoney({ amount: data.amount }).unwrap();
      toast.success(`Successfully deposited $${data.amount.toFixed(2)}`);
      form.reset();
    } catch {
      toast.error("Failed to deposit money. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold">Deposit Money</h1>
        <p className="text-muted-foreground mt-1">Add funds to your wallet</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowDownLeft className="h-5 w-5 text-green-600" />
            Deposit Funds
          </CardTitle>
          <CardDescription>Enter the amount you want to add to your wallet</CardDescription>
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
                  "Deposit Now"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepositPage;
