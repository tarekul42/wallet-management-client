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
import { SendHorizontal, Wallet, Loader2, User } from "lucide-react";
import { useSendMoneyMutation, useGetAccountBalanceQuery } from "@/redux/features/user/user.api";
import { Skeleton } from "@/components/ui/skeleton";

const sendMoneySchema = z.object({
  receiverEmail: z.string().email("Please enter a valid email address"),
  amount: z.coerce.number().min(0.01, "Minimum send is $0.01").max(1000000, "Maximum send is $1,000,000"),
});

const SendMoneyPage = () => {
  const [sendMoney, { isLoading }] = useSendMoneyMutation();
  const { data: balanceRes, isLoading: balanceLoading } = useGetAccountBalanceQuery();
  const balance = balanceRes?.data?.balance ?? 0;

  const DEMO_USERS = [
    { name: "Alice Rahman", email: "alice@example.com" },
    { name: "Bob Hossain", email: "bob@example.com" },
    { name: "Carol Islam", email: "carol@example.com" },
  ];



  interface FormData {
    receiverEmail: string;
    amount: number;
  }

  const form = useForm<FormData>({
    resolver: zodResolver(sendMoneySchema) as Resolver<FormData>,
    defaultValues: { receiverEmail: "", amount: "" as unknown as number },
  });

  const onSubmit = async (data: z.infer<typeof sendMoneySchema>) => {
    try {
      await sendMoney({ receiverEmail: data.receiverEmail, amount: data.amount }).unwrap();
      toast.success(`Successfully sent $${data.amount.toFixed(2)} to ${data.receiverEmail}`);
      form.reset();
    } catch {
      toast.error("Failed to send money. Please check the recipient and try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Send Money</h1>
        <p className="text-muted-foreground mt-1">Transfer funds to another user</p>
      </div>

      <Card className="border-border/70 shadow-sm">
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>
              {balanceLoading ? (
                <Skeleton className="h-7 w-28 mt-0.5" />
              ) : (
                <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SendHorizontal className="h-5 w-5 text-primary" />
            Send Funds
          </CardTitle>
          <CardDescription>Enter the recipient's email and the amount to send</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="receiverEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="recipient@example.com" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs text-muted-foreground">Quick select:</span>
                      {DEMO_USERS.map((u) => (
                        <button
                          key={u.email}
                          type="button"
                          onClick={() => {
                            form.setValue("receiverEmail", u.email, { shouldValidate: true });
                            form.setFocus("amount");
                          }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <User className="h-3 w-3" />
                          {u.name}
                        </button>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
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
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                ) : (
                  "Send Money"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SendMoneyPage;
