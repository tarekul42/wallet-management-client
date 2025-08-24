import { coreFeatures } from "@/assets/data/Features/coreFeatures";
import FeaturesHeader from "./FeaturesHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, LayoutDashboard, Shield, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import CoreFeaturesCard from "./CoreFeaturesCard";
import AdvancedFeaturesCard from "./advancedFeaturesCard";
import { advancedFeatures } from "@/assets/data/Features/advancedFeatures";

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
        <div>
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
        </div>

        {/* Benefits */}
        <div id="benefits" className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Benefits
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Convenient and fast transactions that save you time and effort.",
              "Enhanced privacy and security so you can trust your wallet with confidence.",
              "Intuitive, accessible user interface designed for all levels of technical skill.",
              "Comprehensive financial management tools in one simple app.",
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full shadow-sm">
                  <CardContent className="p-6 text-lg">{text}</CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual Showcase */}
        <div id="visual-showcase" className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Visual Showcase
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <LayoutDashboard className="w-12 h-12 text-indigo-500 mb-3" />
                  <p>Dashboard</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Smartphone className="w-12 h-12 text-pink-500 mb-3" />
                  <p>Money Transfer</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Shield className="w-12 h-12 text-teal-500 mb-3" />
                  <p>Transaction History</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Bell className="w-12 h-12 text-amber-500 mb-3" />
                  <p>Notifications</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

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
