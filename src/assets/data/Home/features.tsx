import { Globe, Shield, Smartphone, Zap } from "lucide-react";

export const features = [
  {
    icon: <Shield className="w-8 h-8 text-blue-600" />,
    title: "Bank-Level Security",
    description:
      "256-bit encryption, multi-factor authentication, and advanced fraud protection keep your money safe.",
    highlight: true,
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    title: "Instant Transfers",
    description:
      "Send money anywhere in seconds with our lightning-fast payment infrastructure.",
    highlight: false,
  },
  {
    icon: <Smartphone className="w-8 h-8 text-green-600" />,
    title: "Mobile First",
    description:
      "Fully responsive design works seamlessly across all your devices and platforms.",
    highlight: false,
  },
  {
    icon: <Globe className="w-8 h-8 text-purple-600" />,
    title: "Global Reach",
    description:
      "Send and receive money across 45+ countries with competitive exchange rates.",
    highlight: true,
  },
];
