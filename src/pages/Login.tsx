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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { Link, useNavigate } from "react-router";
import Logo from "@/assets/icons/Logo";

import { loginSchema } from "@/schemas/login";
import logger from "@/utils/logger";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const result = await login(data).unwrap();
      const payload = result?.data || result;
      dispatch(setCredentials({ token: payload.accessToken, user: payload.user }));
      sessionStorage.setItem("token", payload.accessToken);
      toast.success("Login successful!");
      navigate(payload.redirect || "/dashboard", { replace: true });
    } catch (error) {
      toast.error("Failed to login. Please check your credentials.");
      logger.error(error);
    }
  };

  const demoLogin = (email: string, password: string) => {
    if (!email || !password) {
      toast.error("Demo credentials not configured. Please check your environment variables.");
      return;
    }
    form.setValue("email", email);
    form.setValue("password", password);
    onSubmit({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/[0.03] via-background to-primary/[0.06] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center mb-4">
            <Logo />
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground">Sign in to access your wallet</p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-sm border border-border/70">
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
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  Sign In
                </Button>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-muted-foreground text-center">Quick login as:</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        demoLogin(
                          import.meta.env.VITE_DEMO_USER_EMAIL,
                          import.meta.env.VITE_DEMO_USER_PASSWORD,
                        )
                      }
                      disabled={isLoading}
                    >
                      User
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        demoLogin(
                          import.meta.env.VITE_DEMO_AGENT_EMAIL,
                          import.meta.env.VITE_DEMO_AGENT_PASSWORD,
                        )
                      }
                      disabled={isLoading}
                    >
                      Agent
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        demoLogin(
                          import.meta.env.VITE_DEMO_ADMIN_EMAIL,
                          import.meta.env.VITE_DEMO_ADMIN_PASSWORD,
                        )
                      }
                      disabled={isLoading}
                    >
                      Admin
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Form>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:underline underline-offset-4 font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
