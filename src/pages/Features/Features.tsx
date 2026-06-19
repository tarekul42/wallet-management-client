import { coreFeatures } from "@/assets/data/Features/coreFeatures";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

const roleLabels: Record<string, string> = {
  general: "For everyone",
  user: "For users",
  agent: "For agents",
  admin: "For admins",
};

const roleOrder = ["general", "user", "agent", "admin"];

const Features = () => {
  const [activeRole, setActiveRole] = useState<string | null>(null);

  const grouped = roleOrder
    .map((role) => ({
      role,
      label: roleLabels[role],
      features: coreFeatures.filter((f) => f.role === role),
    }))
    .filter((g) => !activeRole || g.role === activeRole);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary mb-4">
          <Sparkles className="w-5 h-5" />
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
          Everything you need to manage your wallet
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Role-based dashboards, secure transactions, and analytics &mdash; built
          for users, agents, and administrators.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveRole(null)}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors ${
            !activeRole
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
          }`}
        >
          All
        </button>
        {roleOrder.map((role) => (
          <button
            key={role}
            onClick={() => setActiveRole(role)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors ${
              activeRole === role
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {roleLabels[role]}
          </button>
        ))}
      </div>

      <motion.div
        key={activeRole || "all"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="space-y-10"
      >
        {grouped.map((group) => (
          <div key={group.role}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              {group.label}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {group.features.map((feature) => (
                <div
                  key={feature.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    feature.isKey
                      ? "text-primary bg-primary/[0.06]"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <span
                    className={`shrink-0 ${
                      feature.isKey ? "text-primary" : "text-muted-foreground/60"
                    }`}
                  >
                    {feature.icon}
                  </span>
                  {feature.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      <section className="mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-primary/70 text-primary-foreground rounded-xl px-6 py-12 text-center"
        >
          <h2 className="text-2xl font-bold mb-2">
            Ready to get started?
          </h2>
          <p className="text-sm opacity-90 mb-5">
            Sign up free and take control of your finances.
          </p>
          <Button size="lg" variant="secondary" className="font-semibold">
            Get Started Now
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Features;
