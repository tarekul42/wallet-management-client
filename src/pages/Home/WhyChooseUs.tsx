import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Shield, Zap, Globe, HeadphonesIcon } from "lucide-react";

const benefits = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Bank-Level Security",
    description:
      "256-bit encryption, multi-factor authentication, and real-time fraud monitoring.",
    highlight: true,
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Transfers",
    description:
      "Send money anywhere in seconds with lightning-fast infrastructure.",
    highlight: false,
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Reach",
    description:
      "Send and receive money across 45+ countries with competitive exchange rates and low fees.",
    highlight: false,
  },
  {
    icon: <HeadphonesIcon className="w-6 h-6" />,
    title: "24/7 Support",
    description:
      "Our team is available 24/7 to help with any questions or issues.",
    highlight: false,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for Everyone
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Whether you are an individual, an agent, or an administrator, our
            platform adapts to your needs.
          </p>
        </motion.div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-5 p-5 rounded-xl bg-background border"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                {benefit.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
              {benefit.highlight && (
                <Badge variant="secondary" className="shrink-0 mt-0.5">
                  Most Popular
                </Badge>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
