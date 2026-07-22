export function TradeVisual({
  symbols = "TSLA · NVDA · BTC",
  dark = false,
}: {
  symbols?: string;
  dark?: boolean;
}) {
  // On dark cards, forest-colored strokes would vanish; use light inks instead.
  const ink = dark ? "var(--brand-mint)" : "var(--brand-forest)";
  const candleAlt = dark ? "var(--brand-green)" : "var(--brand-forest)";

  return (
    <svg
      viewBox="0 0 280 160"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* Grid */}
      {[44, 72, 100, 128].map((y) => (
        <line
          key={y}
          x1="36"
          x2="244"
          y1={y}
          y2={y}
          stroke={ink}
          strokeOpacity="0.15"
          strokeWidth="1"
        />
      ))}
      {/* Candles */}
      <g strokeLinecap="round">
        <line x1="56" y1="58" x2="56" y2="118" stroke="var(--brand-teal)" strokeWidth="2" />
        <rect x="50" y="70" width="12" height="36" rx="2" fill="var(--brand-teal)" />
        <line x1="88" y1="48" x2="88" y2="108" stroke={candleAlt} strokeWidth="2" />
        <rect x="82" y="56" width="12" height="40" rx="2" fill={candleAlt} />
        <line x1="120" y1="62" x2="120" y2="122" stroke="var(--brand-teal)" strokeWidth="2" />
        <rect x="114" y="78" width="12" height="32" rx="2" fill="var(--brand-teal)" />
        <line x1="152" y1="40" x2="152" y2="96" stroke={candleAlt} strokeWidth="2" />
        <rect x="146" y="48" width="12" height="36" rx="2" fill={candleAlt} />
        <line x1="184" y1="36" x2="184" y2="88" stroke={candleAlt} strokeWidth="2" />
        <rect x="178" y="42" width="12" height="34" rx="2" fill={candleAlt} />
        <line x1="216" y1="28" x2="216" y2="78" stroke="var(--brand-teal)" strokeWidth="2" />
        <rect x="210" y="34" width="12" height="32" rx="2" fill="var(--brand-teal)" />
      </g>
      {/* Trend line */}
      <path
        className="anim-dash-flow"
        d="M50 108 C90 100, 110 88, 150 62 S200 38, 222 40"
        stroke={ink}
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeDasharray="4 4"
      />
      <text
        x="36"
        y="34"
        fill={ink}
        fillOpacity="0.7"
        fontSize="11"
        fontFamily="var(--font-geist-sans), sans-serif"
        letterSpacing="0.08em"
      >
        {symbols}
      </text>
    </svg>
  );
}

export function EarnVisual({ onGreen = false }: { onGreen?: boolean }) {
  // Teal/green bars disappear on a green card; swap to forest/white inks.
  const barLow = onGreen ? "var(--brand-forest)" : "var(--brand-teal)";
  const barHigh = onGreen ? "var(--brand-white)" : "var(--brand-green)";
  const label = onGreen ? "var(--brand-forest)" : "var(--brand-green)";

  return (
    <svg
      viewBox="0 0 280 160"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* Yield bars */}
      <rect className="anim-bar-breathe" x="48" y="96" width="28" height="36" rx="6" fill={barLow} fillOpacity="0.45" />
      <rect className="anim-bar-breathe" style={{ animationDelay: "0.4s" }} x="92" y="78" width="28" height="54" rx="6" fill={barLow} fillOpacity="0.65" />
      <rect className="anim-bar-breathe" style={{ animationDelay: "0.8s" }} x="136" y="58" width="28" height="74" rx="6" fill={barHigh} fillOpacity="0.75" />
      <rect className="anim-bar-breathe" style={{ animationDelay: "1.2s" }} x="180" y="40" width="28" height="92" rx="6" fill={barHigh} />
      {/* Glow ring + APY */}
      <g className="anim-bob">
        <circle cx="214" cy="48" r="28" fill="var(--brand-forest)" />
        <circle
          cx="214"
          cy="48"
          r="28"
          stroke={onGreen ? "var(--brand-mint)" : "var(--brand-green)"}
          strokeWidth="2"
          strokeOpacity="0.7"
        />
        <text
          x="214"
          y="45"
          textAnchor="middle"
          fill="var(--brand-white)"
          fontSize="14"
          fontWeight="600"
          fontFamily="var(--font-geist-sans), sans-serif"
        >
          12%
        </text>
        <text
          x="214"
          y="58"
          textAnchor="middle"
          fill="var(--brand-green)"
          fontSize="8"
          letterSpacing="0.12em"
          fontFamily="var(--font-geist-sans), sans-serif"
        >
          APY
        </text>
      </g>
      <text
        x="48"
        y="34"
        fill={label}
        fontSize="11"
        fontFamily="var(--font-geist-sans), sans-serif"
        letterSpacing="0.08em"
      >
        IDLE STABLES → YIELD
      </text>
    </svg>
  );
}

export function SpendVisual({
  dark = false,
  onTeal = false,
}: {
  dark?: boolean;
  onTeal?: boolean;
}) {
  // Globe linework needs a light ink when the card surface is dark.
  const globeInk = dark ? "var(--brand-mint)" : "var(--brand-forest)";
  // The Visa card graphic is teal; on a teal surface use forest instead.
  const cardFill = onTeal ? "var(--brand-forest)" : "var(--brand-teal)";
  const chipFill = onTeal ? "var(--brand-white)" : "var(--brand-forest)";

  return (
    <svg
      viewBox="0 0 280 160"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* Card */}
      <g className="anim-bob">
        <rect
          x="48"
          y="44"
          width="152"
          height="92"
          rx="14"
          fill={cardFill}
        />
        {onTeal ? null : (
          <rect
            x="48"
            y="44"
            width="152"
            height="92"
            rx="14"
            fill="url(#spendSheen)"
          />
        )}
        <rect x="64" y="62" width="28" height="20" rx="4" fill={chipFill} fillOpacity="0.35" />
        <text
          x="64"
          y="108"
          fill="var(--brand-white)"
          fontSize="11"
          fontWeight="600"
          fontFamily="var(--font-geist-sans), sans-serif"
          letterSpacing="0.14em"
        >
          VELA
        </text>
        <text
          x="64"
          y="122"
          fill="var(--brand-mint)"
          fontSize="8"
          letterSpacing="0.2em"
          fontFamily="var(--font-geist-sans), sans-serif"
          opacity="0.8"
        >
          VISA · WORLD
        </text>
      </g>
      {/* Globe arcs */}
      <circle
        cx="220"
        cy="80"
        r="34"
        stroke={globeInk}
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <ellipse
        cx="220"
        cy="80"
        rx="16"
        ry="34"
        stroke={globeInk}
        strokeWidth="1.5"
        strokeOpacity="0.45"
      />
      <line
        x1="186"
        y1="80"
        x2="254"
        y2="80"
        stroke={globeInk}
        strokeWidth="1.5"
        strokeOpacity="0.45"
      />
      <circle className="anim-blink" cx="208" cy="68" r="3" fill={globeInk} />
      <circle
        className="anim-blink"
        style={{ animationDelay: "0.9s" }}
        cx="232"
        cy="90"
        r="3"
        fill={onTeal ? "var(--brand-mint)" : "var(--brand-teal)"}
      />
      <circle
        className="anim-blink"
        style={{ animationDelay: "1.8s" }}
        cx="220"
        cy="78"
        r="3"
        fill="var(--brand-white)"
      />
      <defs>
        <linearGradient id="spendSheen" x1="48" y1="44" x2="200" y2="136">
          <stop stopColor="var(--brand-green)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--brand-forest)" stopOpacity="0.15" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PortfolioVisual() {
  return (
    <svg
      viewBox="0 0 280 160"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* Allocation donut — inherits card-green tokens so it stays legible
          when themes remap the card surface. */}
      <circle
        cx="92"
        cy="80"
        r="40"
        stroke="var(--card-green-ink)"
        strokeOpacity="0.25"
        strokeWidth="13"
      />
      <g className="anim-spin-slow">
        <circle
          cx="92"
          cy="80"
          r="40"
          stroke="var(--card-green-ink)"
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray="130 252"
          transform="rotate(-90 92 80)"
        />
        <circle
          cx="92"
          cy="80"
          r="40"
          stroke="var(--card-green-pop)"
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray="58 252"
          strokeDashoffset="-142"
          transform="rotate(-90 92 80)"
        />
      </g>
      {/* Holdings rows */}
      <circle cx="172" cy="52" r="6" fill="var(--card-green-pop)" />
      <rect x="188" y="47" width="56" height="10" rx="5" fill="var(--card-green-pop)" fillOpacity="0.85" />
      <circle cx="172" cy="80" r="6" fill="var(--card-green-ink)" />
      <rect x="188" y="75" width="42" height="10" rx="5" fill="var(--card-green-ink)" fillOpacity="0.75" />
      <circle cx="172" cy="108" r="6" fill="var(--card-green-pop)" fillOpacity="0.55" />
      <rect x="188" y="103" width="50" height="10" rx="5" fill="var(--card-green-pop)" fillOpacity="0.5" />
    </svg>
  );
}
