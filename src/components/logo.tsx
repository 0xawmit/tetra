export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" fill="var(--brand-black)" />
        {/* Stylized Tetra T */}
        <path
          d="M8 9.2H24V12.4H17.8V22.8H14.2V12.4H8V9.2Z"
          fill="var(--brand-white)"
        />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight text-nav-ink">
        Tetra
      </span>
    </div>
  );
}
