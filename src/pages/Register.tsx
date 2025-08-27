import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Shield,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowLeft,
  Briefcase,
  Wallet,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/assets/icons/Logo";

const FormSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phone: z
      .string()
      .min(10, {
        message: "Phone number must be at least 10 digits.",
      })
      .regex(/^[0-9+\-\s()]+$/, {
        message: "Please enter a valid phone number.",
      }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
      }),
    confirmPassword: z.string(),
    role: z.enum(["user", "agent"], {
      message: "Please select your account type.",
    }),
    agentDetails: z.string().optional(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "user",
      agentDetails: "",
      termsAccepted: false,
    },
  });

  const selectedRole = form.watch("role");

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Simulate API call
    toast.success("Account created successfully! Please verify your email.");
    console.log("Registration data:", data);

    // Redirect to login after successful registration
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }

  const roleOptions = [
    {
      value: "user",
      title: "Personal User",
      description: "Send money, pay bills, and manage your finances",
      icon: <Wallet className="w-8 h-8 text-blue-600" />,
      features: [
        "Send & receive money",
        "Pay bills",
        "Transaction history",
        "Mobile top-up",
      ],
      popular: true,
    },
    {
      value: "agent",
      title: "Business Agent",
      description: "Provide cash-in/out services and earn commissions",
      icon: <Briefcase className="w-8 h-8 text-green-600" />,
      features: [
        "Cash-in/out services",
        "Earn commissions",
        "Business dashboard",
        "Customer management",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding & Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block space-y-8"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="text-2xl font-bold">Wallet Management</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight">
              Join the Future of
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {" "}
                Digital Payments
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Create your secure digital wallet account and start managing your
              finances with confidence. Trusted by millions worldwide.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-semibold">Bank-Level Security</div>
                <div className="text-sm text-muted-foreground">
                  Your data is protected with 256-bit encryption
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold">Instant Verification</div>
                <div className="text-sm text-muted-foreground">
                  Get verified and start using your wallet immediately
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold">24/7 Support</div>
                <div className="text-sm text-muted-foreground">
                  Our team is always here to help you
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Trusted by 2.5M+ users</span>
            <span>•</span>
            <span>45+ countries</span>
            <span>•</span>
            <span>$50B+ transacted</span>
          </div>
        </motion.div>

        {/* Right Side - Registration Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-4 text-center">
              <div className="lg:hidden flex justify-center">
                <Logo />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">
                  Create Your Account
                </CardTitle>
                <p className="text-muted-foreground">
                  Join millions who trust us with their finances
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Role Selection */}
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          Choose Account Type
                        </FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {roleOptions.map((option) => (
                              <div key={option.value} className="relative">
                                <input
                                  type="radio"
                                  id={option.value}
                                  value={option.value}
                                  checked={field.value === option.value}
                                  onChange={() => field.onChange(option.value)}
                                  className="sr-only peer"
                                />
                                <label
                                  htmlFor={option.value}
                                  className={`block p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 ${
                                    option.popular
                                      ? "ring-2 ring-primary/20"
                                      : ""
                                  }`}
                                >
                                  {option.popular && (
                                    <Badge className="absolute -top-2 left-4 bg-primary">
                                      Most Popular
                                    </Badge>
                                  )}
                                  <div className="flex items-start gap-3">
                                    {option.icon}
                                    <div className="flex-1">
                                      <h3 className="font-semibold mb-1">
                                        {option.title}
                                      </h3>
                                      <p className="text-sm text-muted-foreground mb-3">
                                        {option.description}
                                      </p>
                                      <ul className="space-y-1">
                                        {option.features
                                          .slice(0, 2)
                                          .map((feature, idx) => (
                                            <li
                                              key={idx}
                                              className="text-xs text-muted-foreground flex items-center gap-1"
                                            >
                                              <CheckCircle className="w-3 h-3 text-green-600" />
                                              {feature}
                                            </li>
                                          ))}
                                      </ul>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-base">
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="John"
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
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="Doe"
                                  className="pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

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
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="+1 (555) 123-4567"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Agent Details (conditional) */}
                  {selectedRole === "agent" && (
                    <FormField
                      control={form.control}
                      name="agentDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Information</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your business, location, and why you want to become an agent..."
                              className="min-h-20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Security */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-base">Security</h3>

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
                                placeholder="Create a strong password"
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
                          <div className="text-xs text-muted-foreground">
                            Must contain at least 8 characters, including
                            uppercase, lowercase, and number
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="pl-10 pr-10"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                              >
                                {showConfirmPassword ? (
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
                  </div>

                  {/* Terms and Conditions */}
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-start space-x-2">
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="mt-1 rounded border-input"
                            />
                            <label className="text-sm leading-relaxed">
                              I agree to the{" "}
                              <Link
                                to="/terms"
                                className="text-primary hover:underline"
                              >
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link
                                to="/privacy"
                                className="text-primary hover:underline"
                              >
                                Privacy Policy
                              </Link>
                              . I understand that by creating an account, I
                              consent to the processing of my personal data as
                              described in the privacy policy.
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full">
                    {selectedRole === "agent"
                      ? "Apply as Agent"
                      : "Create Account"}
                  </Button>
                </form>
              </Form>

              {/* Login Link */}
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in here
                  </Link>
                </p>

                <Button variant="ghost" size="sm" asChild>
                  <Link to="/" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
