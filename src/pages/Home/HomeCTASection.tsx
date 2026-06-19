import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router";

const HomeCTASection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/[0.04] via-primary/[0.02] to-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust us with their financial
            transactions every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base px-8 h-12" asChild>
              <Link to="/register">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 h-12" asChild>
              <Link to="/features">Explore Features</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>No monthly fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Instant setup</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>24/7 support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeCTASection;
