import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Play,
  Receipt,
  SendHorizontal,
  Shield,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5 pt-8 pb-16 lg:pt-16 lg:pb-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <Badge
              className="mb-6 bg-primary/10 text-primary border-primary/20"
              variant="outline"
            >
              🚀 Trusted by 2.5M+ Users Worldwide
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Digital Wallet for
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {" "}
                Modern Life
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Send money, pay bills, and manage finances with the most secure
              and user-friendly digital wallet. Join millions who trust us with
              their financial future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/register" className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
                asChild
              >
                <Link to="#demo" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
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
            className="relative"
          >
            <div className="relative z-10 bg-gradient-to-br from-card to-muted/50 p-8 rounded-3xl shadow-2xl border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Wallet Dashboard</h3>
                <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                  Live
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">
                    Available Balance
                  </p>
                  <p className="text-3xl font-bold text-primary">$2,847.50</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background p-4 rounded-xl border">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium">Income</span>
                    </div>
                    <p className="text-xl font-bold">$3,240</p>
                  </div>
                  <div className="bg-background p-4 rounded-xl border">
                    <div className="flex items-center gap-2 mb-2">
                      <Receipt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium">Expenses</span>
                    </div>
                    <p className="text-xl font-bold">$1,425</p>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="font-medium mb-3">Quick Actions</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <Button size="sm" className="flex-col h-auto py-3">
                      <SendHorizontal className="w-4 h-4 mb-1" />
                      Send
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-col h-auto py-3"
                    >
                      <Wallet className="w-4 h-4 mb-1" />
                      Request
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-col h-auto py-3"
                    >
                      <BarChart3 className="w-4 h-4 mb-1" />
                      Analytics
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-green-500/10 p-3 rounded-full shadow-lg backdrop-blur-sm border border-green-500/20"
            >
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="absolute -bottom-4 -left-4 bg-blue-500/10 p-3 rounded-full shadow-lg backdrop-blur-sm border border-blue-500/20"
            >
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
