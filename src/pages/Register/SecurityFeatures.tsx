import { motion } from "framer-motion";
import { CheckCircle, Shield, Star } from "lucide-react";

const SecurityFeatures = () => {
  return (
            <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span>256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Trusted by 2.5M+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>99.9% Uptime</span>
            </div>
          </div>
        </motion.div>
  );
};

export default SecurityFeatures;