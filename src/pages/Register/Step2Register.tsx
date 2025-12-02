import { step2Schema } from "@/schemas/register/steps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Mail } from "lucide-react";
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
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import {
  useSendEmailOtpMutation,
  useVerifyEmailOtpMutation,
} from "@/redux/features/auth/auth.api";
import {
  setCanResendOtp,
  setCurrentStep,
  setIsLoading,
  setOtpTimer,
  updateRegistrationData,
} from "@/redux/features/registrationSlice";

const Step2Register = () => {
  const dispatch = useAppDispatch();
  const { isLoading, registrationData, otpTimer, canResendOtp } =
    useAppSelector((state) => state.registration);

  const [sendEmailOtp] = useSendEmailOtpMutation();

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => {
        dispatch(setOtpTimer(otpTimer - 1));
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      dispatch(setCanResendOtp(true));
    }
  }, [otpTimer, dispatch]);

  // Resend OTP
  const resendOtp = async (type: "email" | "phone") => {
    dispatch(setIsLoading(true));
    try {
      await sendEmailOtp({ email: registrationData.email }).unwrap();
      toast.success(`New OTP sent to your ${type}!`);

      // Start OTP timer
      dispatch(setOtpTimer(60));
      dispatch(setCanResendOtp(false));
    } catch (error) {
      toast.error(`Failed to resend OTP. Please try again.`);
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const step2Form = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: { emailOtp: "" },
  });

  const [verifyEmailOtp] = useVerifyEmailOtpMutation();

  // Handle Step 2 Submission (Email Verification)
  const handleStep2Submit = async (data: z.infer<typeof step2Schema>) => {
    dispatch(setIsLoading(true));
    try {
      await verifyEmailOtp({ ...data, email: registrationData.email }).unwrap();

      dispatch(
        updateRegistrationData({
          ...data,
          emailVerified: true,
        }),
      );
      toast.success("Email verified successfully!");
      dispatch(setCurrentStep(3));

      // Start OTP timer for phone verification
      dispatch(setOtpTimer(60));
      dispatch(setCanResendOtp(false));
    } catch (error) {
      toast.error("Invalid verification code. Please try again.");
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
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
        <h2 className="text-2xl font-semibold mb-2">Verify Your Email</h2>
        <p className="text-muted-foreground">
          We've sent a 6-digit code to{" "}
          <span className="font-medium">{registrationData.email}</span>
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
              onClick={() => dispatch(setCurrentStep(1))}
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
  );
};

export default Step2Register;
