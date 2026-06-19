const FeaturesTag = ({ label }: { label: string }) => {
  return (
    <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-md text-xs font-medium">
      {label}
    </span>
  );
};

export default FeaturesTag;
