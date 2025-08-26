import { SendHorizontal, Shield, Smartphone, Wallet } from "lucide-react";

export const howItWorks = [
  {
    step: "01",
    title: "Sign Up",
    description:
      "Create your account in minutes with just your phone number and basic information.",
    icon: <Smartphone className="w-8 h-8" />,
  },
  {
    step: "02",
    title: "Verify Identity",
    description:
      "Complete quick verification to ensure security and unlock all features.",
    icon: <Shield className="w-8 h-8" />,
  },
  {
    step: "03",
    title: "Add Money",
    description:
      "Visit any agent or use bank transfer to load money into your wallet.",
    icon: <Wallet className="w-8 h-8" />,
  },
  {
    step: "04",
    title: "Start Transacting",
    description:
      "Send money, pay bills, or make purchases with complete peace of mind.",
    icon: <SendHorizontal className="w-8 h-8" />,
  },
];
