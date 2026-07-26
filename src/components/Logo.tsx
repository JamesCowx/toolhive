export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg width="140" height="36" viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c8ee9"/>
          <stop offset="100%" stopColor="#7c3aed"/>
        </linearGradient>
      </defs>
      <rect x="2" y="8" width="22" height="20" rx="4" fill="url(#logoGrad)"/>
      <path d="M7 20l3-5 3 5H7z" fill="white" opacity="0.9"/>
      <path d="M13 18l3-5 3 5h-6z" fill="white" opacity="0.6"/>
      <rect x="27" y="11" width="2" height="14" rx="1" fill="#0f172a"/>
      <text x="34" y="24" fontFamily="Inter, system-ui, sans-serif" fontSize="20" fontWeight="700" fill="#0f172a" letterSpacing="-0.3">ToolHive</text>
    </svg>
  );
}
