/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

const VisualShowcaseCard = ({
  idx,
  title,
  icon,
  description,
}: {
  idx: any;
  title: any;
  icon: any;
  description: any;
}) => {
  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </motion.div>
  );
};

export default VisualShowcaseCard;
