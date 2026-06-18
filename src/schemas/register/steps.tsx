import z from "zod";

const bangladeshPhoneRegex = /^(?:\+8801\d{9}|01\d{9})$/;

export const step1Schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .regex(bangladeshPhoneRegex, "Phone must be a valid Bangladesh number (+8801XXXXXXXXX or 01XXXXXXXXX).")
    .optional()
    .or(z.literal("")),
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
      .min(6, "Password must be at least 6 characters.")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={[}\]:;"'`~<>,.?/\\-]).{6,}$/,
        "Password must include an uppercase letter, a number, and a special character.",
      ),
    confirmPassword: z.string(),
    termsAccepted: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must accept the terms and conditions.",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
