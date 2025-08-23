import { features } from "@/assets/data/featuresData";
import FeaturesCard from "./FeaturesCard";
import FeaturesHeader from "./FeaturesHeader";

const Features = () => {
  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-16">
      <FeaturesHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 2xl:gap-8">
        {features.map(({ id, icon, title, description, isKey, tags }) => (
          <FeaturesCard
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
  );
};

export default Features;
