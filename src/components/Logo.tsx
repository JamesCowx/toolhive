export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg width="150" height="38" viewBox="0 0 150 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c8ee9"/>
          <stop offset="50%" stopColor="#7c3aed"/>
          <stop offset="100%" stopColor="#ec4899"/>
        </linearGradient>
      </defs>
      <rect x="2" y="8" width="24" height="22" rx="5" fill="url(#logoGrad)" className="drop-shadow-lg"/>
      <path d="M8 21l4-7 4 7H8z" fill="white" opacity="0.95"/>
      <path d="M14 18l4-7 4 7h-8z" fill="white" opacity="0.5"/>
      <rect x="28" y="12" width="2" height="14" rx="1" fill="currentColor" opacity="0.3"/>
      <text x="36" y="26" fontFamily="Inter, system-ui, sans-serif" fontSize="22" fontWeight="800" fill="currentColor" letterSpacing="-0.5">ToolHive</text>
    </svg>
  );
}
