import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Loader2, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { axiosInstance } from "@/lib/axios";
import { useState } from "react";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: z.infer<typeof forgotSchema>) => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/auth/forgot-password", { email: data.email });
      setSent(true);
      toast.success("Password reset link sent to your email");
    } catch {
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
          <p className="text-muted-foreground">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <Card className="shadow-md border bg-background">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              We'll send a password reset link to your email address
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div className="text-center py-6 space-y-4">
                <div className="text-green-600 text-lg font-medium">Check your email!</div>
                <p className="text-muted-foreground text-sm">
                  If an account exists with that email, you'll receive a password reset link shortly.
                </p>
                <Button variant="outline" asChild className="mt-4">
                  <Link to="/login">Back to Login</Link>
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="email" placeholder="your@email.com" className="pl-10 h-12" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-12" disabled={isLoading}>
                    {isLoading ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                  <div className="text-center">
                    <Link to="/login" className="text-sm text-primary hover:underline">
                      Back to Login
                    </Link>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
