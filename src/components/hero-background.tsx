"use client";

import { useEffect, useState } from "react";

/**
 * Desktop: four corner product visuals.
 * Mobile: illustration card is rendered in the landing layout flow.
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="hero-glow absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-white)_18%,transparent)_0%,transparent_70%)] sm:h-[32rem] sm:w-[32rem]" />

      {/* Desktop: four corners */}
      <div className="hero-corner-card absolute left-6 top-6 hidden w-[24%] max-w-[260px] sm:block">
        <CryptoChartVisual />
      </div>

      <div className="hero-corner-card absolute right-6 top-6 hidden w-[24%] max-w-[260px] sm:block">
        <StocksVisual />
      </div>

      <div className="hero-corner-card absolute bottom-6 left-6 hidden w-[24%] max-w-[260px] sm:block">
        <YieldVisual />
      </div>

      <div className="hero-corner-card absolute bottom-6 right-6 hidden w-[24%] max-w-[260px] sm:block">
        <CardVisual />
      </div>
    </div>
  );
}

const MOBILE_HOLD_MS = 8200;
const MOBILE_EXIT_MS = 480;

const MOBILE_SCENES = [
  { heading: "Trade crypto", Visual: CryptoChartVisual },
  { heading: "Tokenized stocks", Visual: StocksVisual },
  { heading: "Earn yield", Visual: YieldVisual },
  { heading: "Spend anywhere", Visual: CardVisual },
];

/** Mobile-only product illustration — one card; heading + content cycle with enter/exit. */
export function MobileHeroCard() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    let holdTimer: number | undefined;
    let exitTimer: number | undefined;
    let cancelled = false;

    function scheduleCycle() {
      holdTimer = window.setTimeout(() => {
        if (cancelled) return;
        setPhase("out");
        exitTimer = window.setTimeout(() => {
          if (cancelled) return;
          setIndex((i) => (i + 1) % MOBILE_SCENES.length);
          setPhase("in");
          scheduleCycle();
        }, MOBILE_EXIT_MS);
      }, MOBILE_HOLD_MS);
    }

    scheduleCycle();

    return () => {
      cancelled = true;
      if (holdTimer !== undefined) window.clearTimeout(holdTimer);
      if (exitTimer !== undefined) window.clearTimeout(exitTimer);
    };
  }, []);

  const scene = MOBILE_SCENES[index];
  const Visual = scene.Visual;
  const animClass =
    phase === "in" ? "mobile-hero-scene--in" : "mobile-hero-scene--out";

  return (
    <div
      aria-hidden="true"
      className="mx-auto h-[12.5rem] w-full max-w-[19rem]"
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[1.25rem] border border-brand-forest/10 bg-brand-white p-3 shadow-[0_12px_40px_rgba(11,53,43,0.18)]">
        <p
          key={`heading-${index}`}
          className={`mobile-hero-scene shrink-0 text-left text-[10px] font-semibold tracking-[0.14em] text-brand-slate uppercase ${animClass}`}
        >
          {scene.heading}
        </p>
        <div
          key={`body-${index}`}
          className={`mobile-hero-scene mt-1.5 min-h-0 flex-1 ${animClass}`}
        >
          {/* Remount each visit so in-card motion always starts from scratch */}
          <Visual bare key={index} />
        </div>
      </div>
    </div>
  );
}

function Panel({
  children,
  tone = "white",
  bare = false,
}: {
  children: React.ReactNode;
  tone?: "white" | "mint";
  bare?: boolean;
}) {
  if (bare) {
    return <div className="h-full w-full">{children}</div>;
  }
  const bg = tone === "mint" ? "bg-brand-mint" : "bg-brand-white";
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-brand-forest/10 ${bg} p-3 sm:p-4`}
    >
      {children}
    </div>
  );
}

type VisualProps = {
  /** Strip panel chrome + section labels — used inside the mobile single card. */
  bare?: boolean;
};

const BTC_BASE = [
  { open: 98, close: 124, high: 88, low: 132, up: false },
  { open: 112, close: 82, high: 72, low: 120, up: true },
  { open: 100, close: 72, high: 64, low: 108, up: true },
  { open: 84, close: 108, high: 70, low: 118, up: false },
  { open: 94, close: 66, high: 58, low: 102, up: true },
  { open: 86, close: 56, high: 50, low: 92, up: true },
  { open: 68, close: 90, high: 54, low: 98, up: false },
  { open: 76, close: 48, high: 42, low: 84, up: true },
  { open: 68, close: 42, high: 36, low: 76, up: true },
  { open: 60, close: 36, high: 30, low: 68, up: true },
] as const;

function CryptoChartVisual({ bare = false }: VisualProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Nudge the latest candle each second so the chart "ticks"
  const candles = BTC_BASE.map((c, i) => {
    if (i < BTC_BASE.length - 1) return c;
    const wobble = ((tick % 5) - 2) * 3;
    const close = Math.min(58, Math.max(28, c.close + wobble));
    const open = c.open;
    const up = close < open;
    return {
      open,
      close,
      high: Math.min(c.high, Math.min(open, close) - 6),
      low: Math.max(c.low, Math.max(open, close) + 8),
      up,
    };
  });

  const price = 97200 + (tick % 17) * 14 - 40;
  // Bare (mobile): keep labels in a clear header row; chart sits below.
  const labelY = bare ? 11 : 16;
  const tickCy = bare ? 7 : 12;
  const chartTop = bare ? 26 : 40;
  const viewH = bare ? 130 : 150;
  const volumeBase = bare ? 126 : 146;

  return (
    <Panel tone="white" bare={bare}>
      <svg
        viewBox={`0 0 260 ${viewH}`}
        fill="none"
        className={bare ? "h-full w-full" : "h-auto w-full"}
        preserveAspectRatio="xMidYMid meet"
      >
        <text
          x="4"
          y={labelY}
          fill="var(--brand-forest)"
          fontSize="13"
          fontWeight="600"
          fontFamily="var(--font-geist-sans), sans-serif"
          letterSpacing="0.08em"
        >
          BTC
        </text>
        <circle
          className="anim-btc-tick"
          cx="40"
          cy={tickCy}
          r="3"
          fill="var(--brand-green)"
        />
        <text
          x="256"
          y={labelY}
          textAnchor="end"
          fill="var(--brand-teal)"
          fontSize="12"
          fontWeight="600"
          fontFamily="var(--font-geist-sans), sans-serif"
        >
          ${price.toLocaleString("en-US")}
        </text>
        {[chartTop, chartTop + 28, chartTop + 56, chartTop + 84].map((y) => (
          <line
            key={y}
            x1="4"
            x2="256"
            y1={y}
            y2={y}
            stroke="var(--brand-forest)"
            strokeOpacity="0.08"
          />
        ))}
        <g strokeLinecap="round">
          {candles.map((c, i) => {
            const x = 24 + i * 24;
            const bodyTop = Math.min(c.open, c.close);
            const bodyH = Math.max(4, Math.abs(c.close - c.open));
            const color = c.up ? "var(--brand-green)" : "var(--brand-teal)";
            const isLive = i === candles.length - 1;
            return (
              <g key={`${i}-${isLive ? tick : 0}`} className={isLive ? "anim-btc-candle" : undefined}>
                <line
                  x1={x}
                  y1={c.high}
                  x2={x}
                  y2={c.low}
                  stroke={color}
                  strokeWidth="1.5"
                  strokeOpacity={c.up ? 1 : 0.5}
                />
                <rect
                  x={x - 5}
                  y={bodyTop}
                  width="10"
                  height={bodyH}
                  rx="1.5"
                  fill={color}
                  fillOpacity={c.up ? 1 : 0.4}
                />
              </g>
            );
          })}
        </g>
        <g fill="var(--brand-forest)" fillOpacity="0.55">
          {[8, 12, 10, 6, 14, 16, 8, 18, 12, 20].map((h, i) => (
            <rect
              key={i}
              x={19 + i * 24}
              y={volumeBase - h}
              width="10"
              height={h}
              rx="1"
            />
          ))}
        </g>
      </svg>
    </Panel>
  );
}

function StocksVisual({ bare = false }: VisualProps) {
  const y0 = bare ? 18 : 38;
  const rows = [
    { y: y0, sym: "AAPL", chg: "+1.4%", up: true, d: `M110 ${y0 + 6} L128 ${y0 + 2} L146 ${y0 + 4} L164 ${y0 - 4} L182 ${y0 - 6}` },
    { y: y0 + 28, sym: "NVDA", chg: "+2.8%", up: true, d: `M110 ${y0 + 34} L128 ${y0 + 30} L146 ${y0 + 32} L164 ${y0 + 24} L182 ${y0 + 22}` },
    { y: y0 + 56, sym: "MSFT", chg: "+0.9%", up: true, d: `M110 ${y0 + 62} L128 ${y0 + 58} L146 ${y0 + 60} L164 ${y0 + 54} L182 ${y0 + 52}` },
    { y: y0 + 84, sym: "TSLA", chg: "−0.6%", up: false, d: `M110 ${y0 + 80} L128 ${y0 + 84} L146 ${y0 + 82} L164 ${y0 + 88} L182 ${y0 + 90}` },
  ];

  return (
    <Panel tone="mint" bare={bare}>
      <svg
        viewBox={bare ? "0 0 260 120" : "0 0 260 150"}
        fill="none"
        className={bare ? "h-full w-full" : "h-auto w-full"}
        preserveAspectRatio="xMidYMid meet"
      >
        {!bare && (
          <text
            x="4"
            y="12"
            fill="var(--brand-forest)"
            fillOpacity="0.55"
            fontSize="9"
            fontFamily="var(--font-geist-sans), sans-serif"
            letterSpacing="0.12em"
          >
            TOKENIZED US STOCKS
          </text>
        )}
        {rows.map((row, i) => (
          <g key={row.sym}>
            <rect
              x="4"
              y={row.y - 12}
              width="252"
              height="24"
              rx="7"
              fill={bare ? "var(--brand-mint)" : "var(--brand-white)"}
            />
            <text
              x="16"
              y={row.y + 2}
              fill="var(--brand-forest)"
              fontSize="12"
              fontWeight="600"
              fontFamily="var(--font-geist-sans), sans-serif"
            >
              {row.sym}
            </text>
            <path
              className={bare ? "anim-stock-draw-once" : "anim-stock-draw"}
              style={{ animationDelay: `${i * 0.35}s` }}
              d={row.d}
              stroke={row.up ? "var(--brand-teal)" : "var(--brand-forest)"}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <text
              x="244"
              y={row.y + 2}
              textAnchor="end"
              fill={row.up ? "var(--brand-teal)" : "var(--brand-forest)"}
              fontSize="11"
              fontWeight="600"
              fontFamily="var(--font-geist-sans), sans-serif"
            >
              {row.chg}
            </text>
          </g>
        ))}
      </svg>
    </Panel>
  );
}

function YieldVisual({ bare = false }: VisualProps) {
  const bars = [
    { x: 28, y: bare ? 80 : 100, h: 36, fill: "var(--brand-teal)", delay: "0s" },
    { x: 80, y: bare ? 58 : 78, h: 58, fill: "var(--brand-green)", delay: "0.35s" },
    { x: 132, y: bare ? 32 : 52, h: 84, fill: "var(--brand-forest)", delay: "0.7s", opacity: 0.75 },
    { x: 184, y: bare ? 12 : 32, h: 104, fill: "var(--brand-forest)", delay: "1.05s" },
  ];

  return (
    <Panel tone="mint" bare={bare}>
      <svg
        viewBox={bare ? "0 0 260 130" : "0 0 260 150"}
        fill="none"
        className={bare ? "h-full w-full" : "h-auto w-full"}
        preserveAspectRatio="xMidYMid meet"
      >
        {!bare && (
          <text
            x="4"
            y="14"
            fill="var(--brand-forest)"
            fillOpacity="0.7"
            fontSize="10"
            fontFamily="var(--font-geist-sans), sans-serif"
            letterSpacing="0.06em"
          >
            Earn yield
          </text>
        )}
        {bars.map((bar) => (
          <rect
            key={bar.x}
            className={bare ? "anim-yield-bar-once" : "anim-yield-bar"}
            style={{ animationDelay: bar.delay }}
            x={bar.x}
            y={bar.y}
            width="36"
            height={bar.h}
            rx="6"
            fill={bar.fill}
            fillOpacity={bar.opacity ?? 1}
          />
        ))}
        <text
          x="16"
          y={bare ? 18 : 36}
          fill="var(--brand-forest)"
          fillOpacity="0.45"
          fontSize="10"
          fontFamily="var(--font-geist-sans), sans-serif"
        >
          Idle stables → yield
        </text>
      </svg>
    </Panel>
  );
}

function CardVisual({ bare = false }: VisualProps) {
  const cards = [
    {
      fill: "var(--brand-forest)",
      ink: "var(--brand-white)",
      sub: "var(--brand-mint)",
      className: bare ? "anim-card-fan-0-once" : "anim-card-fan-0",
    },
    {
      fill: "var(--brand-teal)",
      ink: "var(--brand-white)",
      sub: "var(--brand-mint)",
      className: bare ? "anim-card-fan-1-once" : "anim-card-fan-1",
    },
    {
      fill: "var(--brand-green)",
      ink: "var(--brand-forest)",
      sub: "var(--brand-forest)",
      className: bare ? "anim-card-fan-2-once" : "anim-card-fan-2",
    },
    {
      fill: "var(--brand-mint)",
      ink: "var(--brand-forest)",
      sub: "var(--brand-teal)",
      className: bare ? "anim-card-fan-3-once" : "anim-card-fan-3",
    },
  ] as const;

  const svg = (
    <svg
      viewBox="0 0 260 160"
      fill="none"
      className={`w-full overflow-visible ${bare ? "h-full" : "h-auto"}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {cards.map((card, i) => (
        <g key={i} className={card.className}>
          <rect width="180" height="104" rx="14" fill={card.fill} />
          <rect
            width="180"
            height="104"
            rx="14"
            stroke={card.ink}
            strokeOpacity="0.2"
          />
          <rect
            x="16"
            y="18"
            width="28"
            height="20"
            rx="4"
            fill={card.ink}
            fillOpacity="0.22"
          />
          <g stroke={card.ink} strokeOpacity="0.35" strokeWidth="1">
            <line x1="21" y1="23" x2="39" y2="23" />
            <line x1="21" y1="28" x2="39" y2="28" />
            <line x1="21" y1="33" x2="39" y2="33" />
          </g>
          <text
            x="16"
            y="72"
            fill={card.ink}
            fontSize="15"
            fontWeight="600"
            fontFamily="var(--font-geist-sans), sans-serif"
            letterSpacing="0.16em"
          >
            TETRA
          </text>
          <text
            x="16"
            y="88"
            fill={card.sub}
            fontSize="8"
            letterSpacing="0.2em"
            fontFamily="var(--font-geist-sans), sans-serif"
          >
            VISA
          </text>
        </g>
      ))}
    </svg>
  );

  if (bare) {
    return <div className="flex h-full w-full items-center justify-center overflow-hidden">{svg}</div>;
  }

  return svg;
}
