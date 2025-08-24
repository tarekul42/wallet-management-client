/* eslint-disable @typescript-eslint/no-explicit-any */
const BenefitCard = ({ title, description, icon: Icon }: {title: any, description: any, icon: any}) => {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow hover:shadow-lg transition">
      <Icon className="w-10 h-10 text-green-500 mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default BenefitCard;
