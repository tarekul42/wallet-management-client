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
import logger from "@/utils/logger";
import { step2SchemaRefined as stepSchema } from "@/schemas/register/steps";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import {
  resetRegistration,
  setIsLoading,
  setCurrentStep,
} from "@/redux/features/registrationSlice";

const Step2Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const navigateTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const dispatch = useAppDispatch();
  const { isLoading, registrationData } = useAppSelector(
    (state) => state.registration,
  );

  const stepForm = useForm<z.infer<typeof stepSchema>>({
    resolver: zodResolver(stepSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  const [register] = useRegisterMutation();

  useEffect(() => {
    return () => {
      if (navigateTimerRef.current) clearTimeout(navigateTimerRef.current);
    };
  }, []);

  // Handle Step 4 Submission (Final)
  const handleStep4Submit = async (data: z.infer<typeof stepSchema>) => {
    dispatch(setIsLoading(true));
    try {
      const finalData = {
        name: `${registrationData.firstName} ${registrationData.lastName}`.trim(),
        email: registrationData.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        phone: registrationData.phone || undefined,
        role: registrationData.role?.toUpperCase(),
      };
      await register(finalData).unwrap();

      toast.success("Account created successfully!");

      // Reset registration state
      dispatch(resetRegistration());

      navigateTimerRef.current = setTimeout(() => navigate("/login"), 2000);
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string; errorSources?: { path: string; message: string }[] } };
      const errorSources = apiErr?.data?.errorSources;
      if (errorSources && errorSources.length > 0) {
        const msgs = errorSources.map((s) => s.message);
        toast.error(msgs.join("\n"));
      } else {
        toast.error(apiErr?.data?.message || "Registration failed. Please try again.");
      }
      logger.error(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
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
        <h2 className="text-2xl font-semibold mb-2">Secure Your Account</h2>
        <p className="text-muted-foreground">
          Create a strong password to protect your wallet
        </p>
      </div>

      <Form {...stepForm}>
        <form
          onSubmit={stepForm.handleSubmit(handleStep4Submit)}
          className="space-y-6"
        >
          <FormField
            control={stepForm.control}
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
                  Must contain at least 8 characters, including uppercase,
                  lowercase, and number
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={stepForm.control}
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

          <FormField
            control={stepForm.control}
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
                        to="/terms-of-service"
                        className="text-primary hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy-policy"
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      . I understand that by creating an account, I consent to
                      the processing of my personal data as described in the
                      privacy policy.
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => dispatch(setCurrentStep(1))}
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
              {isLoading ? "Creating Account..." : "Complete Registration"}
              <CheckCircle className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default Step2Register;
