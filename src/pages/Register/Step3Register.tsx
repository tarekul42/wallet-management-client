import { step3Schema } from "@/schemas/register/steps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, Check, Clock, Phone, X } from "lucide-react";
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
  useSendPhoneOtpMutation,
  useVerifyPhoneOtpMutation,
} from "@/redux/features/auth/auth.api";
import {
  setCanResendOtp,
  setCurrentStep,
  setIsLoading,
  setOtpTimer,
  updateRegistrationData,
} from "@/redux/features/registrationSlice";

const Step3Register = () => {
  const dispatch = useAppDispatch();
  const { isLoading, registrationData, otpTimer } = useAppSelector(
    (state) => state.registration,
  );

  const step3Form = useForm<z.infer<typeof step3Schema>>({
    resolver: zodResolver(step3Schema),
    defaultValues: { phoneOtp: "" },
  });

  const [verifyPhoneOtp] = useVerifyPhoneOtpMutation();

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

  // Handle Step 3 Submission (Phone Verification)
  const handleStep3Submit = async (data: z.infer<typeof step3Schema>) => {
    dispatch(setIsLoading(true));
    try {
      await verifyPhoneOtp({ ...data, phone: registrationData.phone }).unwrap();

      dispatch(
        updateRegistrationData({
          ...data,
          phoneVerified: true,
        }),
      );
      toast.success("Phone verified successfully!");
      dispatch(setCurrentStep(4));
    } catch (error) {
      toast.error("Invalid verification code. Please try again.");
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  // Handle Step 3 Skip
  const handleStep3Skip = () => {
    dispatch(updateRegistrationData({ phoneVerified: false }));
    toast.warning(
      "Phone verification skipped. Transaction features will be limited.",
    );
    dispatch(setCurrentStep(4));
  };

  const [sendPhoneOtp] = useSendPhoneOtpMutation();

  // Resend OTP
  const resendOtp = async (type: "email" | "phone") => {
    dispatch(setIsLoading(true));
    try {
      await sendPhoneOtp({ phone: registrationData.phone }).unwrap();
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

  return (
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
        <h2 className="text-2xl font-semibold mb-2">Verify Your Phone</h2>
        <p className="text-muted-foreground mb-4">
          We've sent a 6-digit code to{" "}
          <span className="font-medium">{registrationData.phone}</span>
        </p>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-orange-800 mb-1">
                Important Notice
              </p>
              <p className="text-sm text-orange-700">
                You can skip phone verification for now, but you won't be able
                to make any transactions until your phone number is verified.
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
              onClick={() => dispatch(setCurrentStep(2))}
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
  );
};

export default Step3Register;
