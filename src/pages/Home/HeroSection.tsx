import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Play,
  SendHorizontal,
  Users,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { Link } from "react-router";

const roles = [
  { icon: <Users className="w-5 h-5" />, label: "Users", desc: "Send & receive" },
  { icon: <Building2 className="w-5 h-5" />, label: "Agents", desc: "Facilitate transactions" },
  { icon: <ShieldCheck className="w-5 h-5" />, label: "Admins", desc: "Oversee operations" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-primary/[0.02] to-background pt-20 pb-16 lg:pt-24 lg:pb-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <Badge className="mb-6" variant="outline">
              The Complete Money Ecosystem
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Your Digital Wallet for
              <span className="text-primary"> Modern Life</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed max-w-xl">
              Send money, pay bills, and manage your finances — all from one
              platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button size="lg" className="h-11" asChild>
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11"
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Play className="w-4 h-4 mr-1" />
                How It Works
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Free to join</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Bank-level security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>24/7 support</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative flex items-center justify-center">
              {/* Central hub */}
              <div className="absolute z-10 w-32 h-32 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <div className="text-center text-primary-foreground">
                  <SendHorizontal className="w-7 h-7 mx-auto mb-1" />
                  <span className="text-xs font-semibold">Wallet</span>
                </div>
              </div>

              {/* Connected nodes */}
              {[
                { angle: -90, x: 0, y: -100, role: roles[0] },
                { angle: 30, x: 86, y: 50, role: roles[1] },
                { angle: 150, x: -86, y: 50, role: roles[2] },
              ].map((node, i) => (
                <motion.div
                  key={node.role.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.15 }}
                  className="absolute z-20"
                  style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
                >
                  <div className="w-28 h-28 rounded-2xl bg-card border shadow-sm flex flex-col items-center justify-center gap-1.5">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {node.role.icon}
                    </div>
                    <span className="text-sm font-semibold">{node.role.label}</span>
                    <span className="text-[10px] text-muted-foreground">{node.role.desc}</span>
                  </div>
                </motion.div>
              ))}

              {/* Connection lines */}
              <svg className="absolute w-60 h-60" viewBox="0 0 240 240">
                <line x1="120" y1="120" x2="120" y2="20" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />
                <line x1="120" y1="120" x2="206" y2="170" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />
                <line x1="120" y1="120" x2="34" y2="170" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
