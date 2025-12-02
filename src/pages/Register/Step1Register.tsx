import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { step1Schema } from "@/schemas/register/steps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { motion } from "framer-motion";
import RoleSelection from "./RoleSelection";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Mail, Phone, User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useEffect } from "react";
import { useSendEmailOtpMutation } from "@/redux/features/auth/auth.api";
import {
  setCanResendOtp,
  setCurrentStep,
  setIsLoading,
  setOtpTimer,
  updateRegistrationData,
} from "@/redux/features/registrationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const Step1Register = () => {
  const dispatch = useAppDispatch();
  const { isLoading, otpTimer } = useAppSelector((state) => state.registration);

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

  const handleStep1Submit = async (data: z.infer<typeof step1Schema>) => {
    dispatch(setIsLoading(true));
    try {
      await sendEmailOtp({ email: data.email }).unwrap();

      dispatch(updateRegistrationData(data));
      toast.success("Verification code sent to your email!");
      dispatch(setCurrentStep(2));

      // Start OTP timer
      dispatch(setOtpTimer(60));
      dispatch(setCanResendOtp(false));
    } catch (error) {
      toast.error("Failed to send verification code. Please try again.");
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Basic Information</h2>
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
                      <Input placeholder="John" className="pl-10" {...field} />
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
                      <Input placeholder="Doe" className="pl-10" {...field} />
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
  );
};

export default Step1Register;
