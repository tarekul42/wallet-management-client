const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      width="50"
      height="39"
      viewBox="0 0 100 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="8" y="18" width="84" height="52" rx="10" fill="oklch(0.514 0.075 230)" />
      <rect x="8" y="32" width="84" height="12" rx="6" fill="oklch(0.62 0.08 230)" />
      <circle cx="72" cy="44" r="12" fill="#fff" />
      <circle cx="72" cy="44" r="8" fill="oklch(0.514 0.075 230)" />
      <circle cx="72" cy="44" r="4" fill="#fff" />
      <rect x="8" y="18" width="84" height="52" rx="10" stroke="oklch(0.62 0.08 230)" strokeWidth="2" fill="none" />
      <line x1="24" y1="14" x2="32" y2="24" stroke="oklch(0.62 0.08 230)" strokeWidth="3" strokeLinecap="round" />
      <line x1="76" y1="14" x2="68" y2="24" stroke="oklch(0.62 0.08 230)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

export default Logo;
