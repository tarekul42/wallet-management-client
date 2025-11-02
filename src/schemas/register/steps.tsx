import z from "zod";

export const step1Schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits.")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number."),
  role: z.enum(["user", "agent"], {
    message: "Please select your account type.",
  }),
  agentDetails: z.string().optional(),
});

export const step2Schema = z.object({
  emailOtp: z
    .string()
    .min(6, "OTP must be 6 digits.")
    .max(6, "OTP must be 6 digits."),
});

export const step3Schema = z.object({
  phoneOtp: z
    .string()
    .min(6, "OTP must be 6 digits.")
    .max(6, "OTP must be 6 digits.")
    .optional(),
});

export const step4Schema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and number."
      ),
    confirmPassword: z.string(),
    termsAccepted: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must accept the terms and conditions."
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
