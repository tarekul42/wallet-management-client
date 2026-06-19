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
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
      <Card className="h-full shadow-lg border border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 opacity-60 blur-2xl" />

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-2">
            <Icon className="w-8 h-8 text-primary" />
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {variant}
            </span>
          </div>
          <CardTitle className="mt-2">{title}</CardTitle>
        </CardHeader>

        <CardContent className="relative z-10 text-muted-foreground">{description}</CardContent>
      </Card>
    </motion.div>
  );
};

export default AdvancedFeaturesCard;
