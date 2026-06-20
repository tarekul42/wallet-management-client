import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import { Loader2, MinusCircle, Copy, Check } from "lucide-react";
import { useWithdrawMoneyFromUserMutation } from "@/redux/features/agent/agent.api";

const withdrawSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  amount: z.coerce.number().min(0.01, "Minimum withdrawal is $0.01").max(1000000, "Maximum withdrawal is $1,000,000"),
});

const DEMO_USERS = [
  { name: "Demo User", email: "demo.user@example.com" },
  { name: "Alice Rahman", email: "alice@example.com" },
  { name: "Bob Hossain", email: "bob@example.com" },
  { name: "Carol Islam", email: "carol@example.com" },
  { name: "Dave Khan", email: "dave@example.com" },
  { name: "Eva Sultana", email: "eva@example.com" },
];

const WithdrawMoneyPage = () => {
  const [withdrawMoney, { isLoading }] = useWithdrawMoneyFromUserMutation();
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  type FormData = z.infer<typeof withdrawSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(withdrawSchema) as Resolver<FormData>,
    defaultValues: { userId: "", amount: undefined },
  });

  const onSubmit = async (data: z.infer<typeof withdrawSchema>) => {
    try {
      await withdrawMoney({ fromId: data.userId, amount: data.amount }).unwrap();
      toast.success(`Successfully withdrew $${data.amount.toFixed(2)} from user account`);
      form.reset();
    } catch {
      toast.error("Failed to withdraw money. Please check the user ID and try again.");
    }
  };

  const copyEmail = async (email: string) => {
    await navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
    toast.info(`Copied ${email}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Withdraw from User</h1>
        <p className="text-muted-foreground mt-1">Debit funds from a user's wallet</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MinusCircle className="h-5 w-5 text-red-600" />
            Debit User Wallet
          </CardTitle>
          <CardDescription>Enter the user's ID and the amount to withdraw</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User ID</FormLabel>
                    <FormControl>
                      <Input placeholder="64-character user ID" className="h-12 font-mono" {...field} />
                    </FormControl>
                    <FormMessage />
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
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
                ) : (
                  "Withdraw"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Demo Users</CardTitle>
          <CardDescription>Use these demo accounts for testing. Get user IDs from the seed script output or database.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {DEMO_USERS.map((u) => (
              <div key={u.email} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
                <div>
                  <span className="font-medium">{u.name}</span>
                  <span className="text-muted-foreground ml-2">{u.email}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyEmail(u.email)}>
                  {copiedEmail === u.email ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WithdrawMoneyPage;
