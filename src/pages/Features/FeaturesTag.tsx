const FeaturesTag = ({ label }: { label: string }) => {
    const cls =
      "bg-primary-foreground text-slate-700 dark:bg-slate-900/40 dark:text-slate-300";
  return (
    
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
        {label}
      </span>
  );
};

export default FeaturesTag;