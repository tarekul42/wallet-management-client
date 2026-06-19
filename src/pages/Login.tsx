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
import config from "@/config";

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
      localStorage.setItem("token", payload.accessToken);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to login. Please check your credentials.");
      logger.error(error);
    }
  };

  const handleDemoLogin = () => {
    const demoData = {
      email: import.meta.env.VITE_DEMO_USER_EMAIL,
      password: import.meta.env.VITE_DEMO_USER_PASSWORD,
    };
    if (!demoData.email || !demoData.password) {
      toast.error("Demo credentials not configured. Please check your environment variables.");
      return;
    }
    form.setValue("email", demoData.email);
    form.setValue("password", demoData.password);
    onSubmit(demoData);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${config.baseUrl}/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${config.baseUrl}/auth/facebook`;
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Logo />
            <span className="text-2xl font-bold">Wallet Management</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground">Sign in to access your wallet</p>
        </div>

        <div className="bg-background p-8 rounded-lg shadow-xl border">
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
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
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
                <Button type="submit" className="w-full" loading={isLoading}>
                  Sign In
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                >
                  Login as Demo User
                </Button>
              </div>
            </form>
          </Form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={handleGoogleLogin}
            >
              Google
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={handleFacebookLogin}
            >
              Facebook
            </Button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
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
