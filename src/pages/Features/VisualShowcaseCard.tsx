import { motion } from "framer-motion";
import type { JSX } from "react";

const VisualShowcaseCard = ({
  idx,
  title,
  icon,
  description,
}: {
  idx: number;
  title: string;
  icon: JSX.Element;
  description: string;
}) => {
  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.1 }}
      viewport={{ once: true }}
      className="bg-card shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow border"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-card-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
};

export default VisualShowcaseCard;
