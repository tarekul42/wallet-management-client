import { motion } from "framer-motion";
import { Clock, Globe, TrendingUp, Users } from "lucide-react";
import { useGetPlatformStatsQuery } from "@/redux/features/public/public.api";

const statIcons = [
  { icon: <Users className="w-5 h-5" />, label: "Active Users", key: "activeUsers", suffix: "+" },
  { icon: <TrendingUp className="w-5 h-5" />, label: "Transacted", key: "totalVolume", prefix: "$", suffix: "+", format: true },
  { icon: <Globe className="w-5 h-5" />, label: "Countries", key: "countriesServed", suffix: "+" },
  { icon: <Clock className="w-5 h-5" />, label: "Uptime", key: "uptime", suffix: "" },
];

const formatVolume = (val: number) => {
  if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(1)}B`;
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000) return `${(val / 1_000).toFixed(1)}K`;
  return val.toFixed(0);
};

const StatsSection = () => {
  const { data: statsRes } = useGetPlatformStatsQuery();
  const stats = statsRes?.data;

  const getValue = (item: { key: string; prefix?: string; format?: boolean; suffix: string }) => {
    if (!stats) return "—";
    const val = stats[item.key as keyof typeof stats];
    if (item.format && typeof val === "number") {
      return `${item.prefix || ""}${formatVolume(val)}${item.suffix}`;
    }
    return `${item.prefix || ""}${val}${item.suffix}`;
  };

  return (
    <section className="py-16 bg-primary">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statIcons.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center text-primary-foreground"
            >
              <div className="flex justify-center mb-2">{item.icon}</div>
              <div className="text-3xl font-bold mb-1 tracking-tight">{getValue(item)}</div>
              <div className="text-sm opacity-90">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
