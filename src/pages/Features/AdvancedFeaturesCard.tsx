import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import type React from "react";

const AdvancedFeaturesCard = ({
  icon: Icon,
  title,
  description,
  variant,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  variant: string;
}) => {
  return (
    <>
      <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
        <Card className="h-full shadow-lg border border-cyan-300/40 dark:border-cyan-700/40 bg-gradient-to-br from-white via-cyan-50 to-blue-50 dark:from-card dark:via-cyan-950/10 dark:to-blue-950/10 relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-60 blur-2xl" />

          <CardHeader className="relative z-10">
            <div className="flex items-center gap-2">
              <Icon className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-900/30 px-2 py-0.5 rounded-full">
                {variant}
              </span>
            </div>
            <CardTitle className="mt-2">{title}</CardTitle>
          </CardHeader>

          <CardContent className="relative z-10 text-muted-foreground">{description}</CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default AdvancedFeaturesCard;
