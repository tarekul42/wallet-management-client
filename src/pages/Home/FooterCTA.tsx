import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router";

const FooterCTA = () => {
  return (
    <section className="py-12 bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold mb-4">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">
            Our support team is here to help you get started and answer any
            questions you might have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/faqs">View FAQs</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
