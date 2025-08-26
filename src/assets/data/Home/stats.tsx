import { Clock, Globe, TrendingUp, Users } from "lucide-react";

export const stats = [
  {
    number: "2.5M+",
    label: "Active Users",
    icon: <Users className="w-6 h-6" />,
  },
  {
    number: "$50B+",
    label: "Transacted",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  { number: "45+", label: "Countries", icon: <Globe className="w-6 h-6" /> },
  { number: "99.9%", label: "Uptime", icon: <Clock className="w-6 h-6" /> },
];
