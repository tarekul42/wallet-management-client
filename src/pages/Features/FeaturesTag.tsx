const FeaturesTag = ({ label }: { label: string }) => {
  const cls =
    "bg-primary text-primary-foreground dark:bg-slate-300/40 dark:text-slate-300";
  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${cls}`}>
      {label}
    </span>
  );
};

export default FeaturesTag;
