import { coreFeatures } from "@/assets/data/Features/coreFeatures";
import FeaturesHeader from "./FeaturesHeader";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import CoreFeaturesCard from "./CoreFeaturesCard";
import AdvancedFeaturesCard from "./advancedFeaturesCard";
import { advancedFeatures } from "@/assets/data/Features/advancedFeatures";
import { benefits } from "@/assets/data/benefits";
import BenefitCard from "./BenefitCard";
import { visualShowcase } from "@/assets/data/visualShowcase";
import VisualShowcaseCard from "./VisualShowcaseCard";

const Features = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-16">
      <section>
        <FeaturesHeader />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Core Features
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 2xl:gap-8">
          {coreFeatures.map(({ id, icon, title, description, isKey, tags }) => (
            <CoreFeaturesCard
              key={id}
              id={id}
              icon={icon}
              title={title}
              description={description}
              tags={tags}
              isKey={isKey}
            />
          ))}
        </div>
      </section>
      {/* // start the existing basic part */}
      <section className="py-16 space-y-24">
        {/* Advanced Features */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Advanced Features
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 2xl:gap-8">
          {advancedFeatures.map(
            ({ icon, title, description, variant }, idx) => (
              <AdvancedFeaturesCard
                key={idx}
                icon={icon}
                title={title}
                description={description}
                variant={variant}
              />
            )
          )}
        </div>

        {/* Benefits */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Benefits
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 2xl:gap-8">
            {benefits.map(({ title, description, icon }, idx) => (
              <BenefitCard
                key={idx}
                title={title}
                description={description}
                icon={icon}
              />
            ))}
          </div>
        </section>

        {/* Visual Showcase */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Visual Showcase
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 2xl:gap-8">
            {visualShowcase.map(({ title, icon, description }, idx) => (
              <VisualShowcaseCard
                key={idx}
                title={title}
                icon={icon}
                description={description}
                idx={idx}
              />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.div
          id="cta"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-16 px-6 rounded-2xl shadow-lg max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Join thousands who trust our secure and easy-to-use digital wallet
            today.
          </h2>
          <p className="mb-6 text-lg">
            Sign up now and take control of your financial journey.
          </p>
          <Button size="lg" variant="secondary" className="font-semibold">
            Get Started Now
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Features;
