import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const steps = [
  {
    step: 1,
    title: "Create Your Account",
    description: "Sign up in minutes. Choose your role — User, Agent, or Admin.",
  },
  {
    step: 2,
    title: "Add Funds",
    description: "Deposit money via bank transfer, card, or through an agent.",
  },
  {
    step: 3,
    title: "Start Transacting",
    description: "Send money, pay bills, withdraw cash — all from one dashboard.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 lg:py-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">
            Getting Started
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to start managing your money.
          </p>
        </motion.div>

        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-center gap-0 lg:gap-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="flex items-center w-full lg:w-1/3"
            >
              <div className="flex flex-col items-center text-center px-6 w-full">
                <div className="relative mb-5">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center w-8 shrink-0 mt-[-3.5rem]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-border">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile: connector dots */}
        <div className="flex lg:hidden justify-center gap-2 mt-8">
          {steps.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-primary/30" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
