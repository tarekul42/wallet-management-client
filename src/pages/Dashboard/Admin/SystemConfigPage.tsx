import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useGetSystemConfigQuery, useUpdateSystemConfigMutation } from "@/redux/features/admin/admin.api";
import type { ISystemConfig } from "@/types/api";

const configSchema = z.object({
  sendMoneyFee: z.coerce.number().min(0, "Fee must be 0 or greater").max(1, "Fee must be 100% or less"),
  cashInFee: z.coerce.number().min(0, "Fee must be 0 or greater").max(1, "Fee must be 100% or less"),
  withdrawFee: z.coerce.number().min(0, "Fee must be 0 or greater").max(1, "Fee must be 100% or less"),
  dailyLimit: z.coerce.number().min(1, "Daily limit must be at least 1"),
});

type FormData = z.infer<typeof configSchema>;

const SystemConfigPage = () => {
  const { data: configRes, isLoading: loadingConfig } = useGetSystemConfigQuery();
  const [updateConfig, { isLoading: saving }] = useUpdateSystemConfigMutation();

  const config = configRes?.data as ISystemConfig | undefined;

  const form = useForm<FormData>({
    resolver: zodResolver(configSchema) as Resolver<FormData>,
    values: {
      sendMoneyFee: config?.sendMoneyFee ?? 0,
      cashInFee: config?.cashInFee ?? 0,
      withdrawFee: config?.withdrawFee ?? 0,
      dailyLimit: config?.dailyLimit ?? 10000,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateConfig(data).unwrap();
      toast.success("System configuration updated successfully");
    } catch {
      toast.error("Failed to update system configuration");
    }
  };

  if (loadingConfig) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 pb-12">
        <Skeleton className="h-10 w-64" />
        <Card className="border-0 shadow-md">
          <CardContent className="p-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold">System Configuration</h1>
        <p className="text-muted-foreground mt-1">Manage fees, limits, and system-wide settings</p>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Fee & Limit Settings
          </CardTitle>
          <CardDescription>Update transaction fees and daily limits for the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="sendMoneyFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Send Money Fee (%)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.001" min="0" max="1" placeholder="0.01" className="h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cashInFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cash In Fee (%)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.001" min="0" max="1" placeholder="0" className="h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="withdrawFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Withdraw Fee (%)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.001" min="0" max="1" placeholder="0.015" className="h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="dailyLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daily Transaction Limit ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" placeholder="50000" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end pt-4">
                <Button type="submit" className="gap-2" disabled={saving}>
                  {saving ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
                  ) : (
                    "Save Configuration"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemConfigPage;
