/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Clock,
  Check,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/icons/Logo";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
} from "@/schemas/register/steps";
import { RegisterProgressSteps } from "./Register/RegisterProgressSteps";
import SecurityFeatures from "./Register/SecurityFeatures";
import RoleSelection from "./Register/RoleSelection";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const navigate = useNavigate();

  // Form configurations for each step
  const step1Form = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "user",
      agentDetails: "",
    },
  });

  const step2Form = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: { emailOtp: "" },
  });

  const step3Form = useForm<z.infer<typeof step3Schema>>({
    resolver: zodResolver(step3Schema),
    defaultValues: { phoneOtp: "" },
  });

  const step4Form = useForm<z.infer<typeof step4Schema>>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  // Handle Step 1 Submission
  const handleStep1Submit = async (data: z.infer<typeof step1Schema>) => {
    setIsLoading(true);
    try {
      // Simulate API call to create user and send email OTP
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setRegistrationData({ ...registrationData, ...data });
      toast.success("Verification code sent to your email!");
      setCurrentStep(2);
      startOtpTimer();
    } catch (error) {
      toast.error("Failed to send verification code. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Step 2 Submission (Email Verification)
  const handleStep2Submit = async (data: z.infer<typeof step2Schema>) => {
    setIsLoading(true);
    try {
      // Simulate API call to verify email OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setRegistrationData({
        ...registrationData,
        ...data,
        emailVerified: true,
      });
      toast.success("Email verified successfully!");
      setCurrentStep(3);
      startOtpTimer(); // For phone verification
    } catch (error) {
      toast.error("Invalid verification code. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Step 3 Submission (Phone Verification)
  const handleStep3Submit = async (data: z.infer<typeof step3Schema>) => {
    setIsLoading(true);
    try {
      // Simulate API call to verify phone OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setRegistrationData({
        ...registrationData,
        ...data,
        phoneVerified: true,
      });
      toast.success("Phone verified successfully!");
      setCurrentStep(4);
    } catch (error) {
      toast.error("Invalid verification code. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Step 3 Skip
  const handleStep3Skip = () => {
    setRegistrationData({ ...registrationData, phoneVerified: false });
    toast.warning(
      "Phone verification skipped. Transaction features will be limited."
    );
    setCurrentStep(4);
  };

  // Handle Step 4 Submission (Final)
  const handleStep4Submit = async (data: z.infer<typeof step4Schema>) => {
    setIsLoading(true);
    try {
      // Simulate API call to complete registration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const finalData = { ...registrationData, ...data };
      console.log("Final registration data:", finalData);

      toast.success("Account created successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // OTP Timer functionality
  const startOtpTimer = () => {
    setOtpTimer(60);
    setCanResendOtp(false);
    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          setCanResendOtp(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Resend OTP
  const resendOtp = async (type: "email" | "phone") => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(`New OTP sent to your ${type}!`);
      startOtpTimer();
    } catch (error) {
      toast.error(`Failed to resend OTP. Please try again.`);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Logo />
            <span className="text-2xl font-bold">Wallet Management</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">
            Complete all steps to create your secure digital wallet account
          </p>
        </motion.div>

        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            <RegisterProgressSteps currentStep={currentStep} />

            <AnimatePresence mode="wait">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold mb-2">
                      Basic Information
                    </h2>
                    <p className="text-muted-foreground">
                      Tell us about yourself to get started
                    </p>
                  </div>

                  <Form {...step1Form}>
                    <form
                      onSubmit={step1Form.handleSubmit(handleStep1Submit)}
                      className="space-y-6"
                    >
                      {/* Role Selection */}
                      <RoleSelection step1Form={step1Form} />

                      {/* Personal Information */}
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={step1Form.control}
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
                          control={step1Form.control}
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
                        control={step1Form.control}
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
                        control={step1Form.control}
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

                      {/* Agent Details */}
                      {step1Form.watch("role") === "agent" && (
                        <FormField
                          control={step1Form.control}
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

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" asChild>
                          <Link to="/" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                          </Link>
                        </Button>

                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="flex items-center gap-2"
                        >
                          {isLoading ? "Processing..." : "Next Step"}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </form>
                  </Form>
                </motion.div>
              )}

              {/* Step 2: Email Verification */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">
                      Verify Your Email
                    </h2>
                    <p className="text-muted-foreground">
                      We've sent a 6-digit code to{" "}
                      <span className="font-medium">
                        {registrationData.email}
                      </span>
                    </p>
                  </div>

                  <Form {...step2Form}>
                    <form
                      onSubmit={step2Form.handleSubmit(handleStep2Submit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={step2Form.control}
                        name="emailOtp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Verification Code</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="000000"
                                className="text-center text-2xl tracking-widest"
                                maxLength={6}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="text-center">
                        {otpTimer > 0 ? (
                          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                            <Clock className="w-4 h-4" />
                            Resend code in {otpTimer}s
                          </p>
                        ) : (
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => resendOtp("email")}
                            disabled={isLoading && !canResendOtp}
                          >
                            Resend verification code
                          </Button>
                        )}
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(1)}
                          className="flex items-center gap-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </Button>

                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="flex items-center gap-2"
                        >
                          {isLoading ? "Verifying..." : "Verify Email"}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </form>
                  </Form>
                </motion.div>
              )}

              {/* Step 3: Phone Verification (Optional) */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">
                      Verify Your Phone
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      We've sent a 6-digit code to{" "}
                      <span className="font-medium">
                        {registrationData.phone}
                      </span>
                    </p>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-orange-800 mb-1">
                            Important Notice
                          </p>
                          <p className="text-sm text-orange-700">
                            You can skip phone verification for now, but you
                            won't be able to make any transactions until your
                            phone number is verified.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Form {...step3Form}>
                    <form
                      onSubmit={step3Form.handleSubmit(handleStep3Submit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={step3Form.control}
                        name="phoneOtp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Verification Code</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="000000"
                                className="text-center text-2xl tracking-widest"
                                maxLength={6}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="text-center">
                        {otpTimer > 0 ? (
                          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                            <Clock className="w-4 h-4" />
                            Resend code in {otpTimer}s
                          </p>
                        ) : (
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => resendOtp("phone")}
                            disabled={isLoading}
                          >
                            Resend verification code
                          </Button>
                        )}
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(2)}
                          className="flex items-center gap-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </Button>

                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={handleStep3Skip}
                            className="flex items-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            Skip for Now
                          </Button>

                          <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2"
                          >
                            {isLoading ? "Verifying..." : "Verify Phone"}
                            <Check className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </form>
                  </Form>
                </motion.div>
              )}

              {/* Step 4: Password & Terms */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-8 h-8 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">
                      Secure Your Account
                    </h2>
                    <p className="text-muted-foreground">
                      Create a strong password to protect your wallet
                    </p>
                  </div>

                  <Form {...step4Form}>
                    <form
                      onSubmit={step4Form.handleSubmit(handleStep4Submit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={step4Form.control}
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
                        control={step4Form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
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

                      <FormField
                        control={step4Form.control}
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
                                  consent to the processing of my personal data
                                  as described in the privacy policy.
                                </label>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Verification Status Summary */}
                      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                        <h4 className="font-medium text-sm">
                          Verification Status:
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Email verified</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {registrationData.phoneVerified ? (
                              <>
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span>Phone verified</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="w-4 h-4 text-orange-500" />
                                <span>
                                  Phone verification skipped - Transactions will
                                  be limited
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(3)}
                          className="flex items-center gap-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </Button>

                        <Button
                          type="submit"
                          disabled={isLoading}
                          size="lg"
                          className="flex items-center gap-2"
                        >
                          {isLoading
                            ? "Creating Account..."
                            : "Complete Registration"}
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </form>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Link */}
            <div className="text-center mt-8 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Features */}
        <SecurityFeatures />
      </div>
    </div>
  );
};

export default Register;
