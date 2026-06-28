import { motion } from "framer-motion";
import { Clock, Globe, TrendingUp, Users } from "lucide-react";

const stats = [
  { icon: <Users className="w-5 h-5" />, label: "Active Users", value: "2.5M+" },
  { icon: <TrendingUp className="w-5 h-5" />, label: "Transacted", value: "$2.8B+" },
  { icon: <Globe className="w-5 h-5" />, label: "Countries", value: "45+" },
  { icon: <Clock className="w-5 h-5" />, label: "Uptime", value: "99.9%" },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex justify-center mb-3 text-primary opacity-60">
                {item.icon}
              </div>
              <div className="text-3xl font-bold mb-1 tracking-tight text-foreground">
                {item.value}
              </div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
