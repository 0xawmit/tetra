"use client";

import { useEffect, useRef, useState } from "react";

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

type BtcCandle = {
  id: number;
  open: number;
  close: number;
  high: number;
  low: number;
  up: boolean;
  volume: number;
};

const BTC_VISIBLE = 10;
/** SVG y: smaller = higher price */
const BTC_Y_MIN = 34;
const BTC_Y_MAX = 122;

const BTC_SEED: BtcCandle[] = [
  // Left → right uptrend (smaller y = higher price)
  { id: 0, open: 118, close: 108, high: 102, low: 124, up: true, volume: 8 },
  { id: 1, open: 108, close: 98, high: 92, low: 114, up: true, volume: 10 },
  { id: 2, open: 98, close: 104, high: 94, low: 110, up: false, volume: 7 },
  { id: 3, open: 104, close: 88, high: 82, low: 110, up: true, volume: 14 },
  { id: 4, open: 88, close: 78, high: 72, low: 94, up: true, volume: 12 },
  { id: 5, open: 78, close: 84, high: 74, low: 90, up: false, volume: 8 },
  { id: 6, open: 84, close: 66, high: 60, low: 90, up: true, volume: 16 },
  { id: 7, open: 66, close: 54, high: 48, low: 72, up: true, volume: 18 },
  { id: 8, open: 54, close: 58, high: 50, low: 64, up: false, volume: 9 },
  { id: 9, open: 58, close: 42, high: 36, low: 64, up: true, volume: 20 },
];

function clampBtcY(n: number) {
  return Math.min(BTC_Y_MAX, Math.max(BTC_Y_MIN, n));
}

function makeBtcCandle(prevClose: number, id: number): BtcCandle {
  const open = clampBtcY(prevClose);
  // Near the top: soft pullback so the next leg can climb again.
  // Otherwise ~4 in 5 candles are green (price up = lower y).
  const nearTop = open < 50;
  const isUp = Math.random() < (nearTop ? 0.3 : 0.82);
  const magnitude = 8 + Math.random() * 16;
  const close = clampBtcY(open + (isUp ? -magnitude : magnitude * 0.7));
  const bodyTop = Math.min(open, close);
  const bodyBot = Math.max(open, close);
  const high = clampBtcY(bodyTop - (4 + Math.random() * 8));
  const low = clampBtcY(bodyBot + (4 + Math.random() * 8));
  return {
    id,
    open,
    close,
    high: Math.min(high, bodyTop),
    low: Math.max(low, bodyBot),
    up: close < open,
    volume: 6 + Math.floor(Math.random() * 14),
  };
}

function CryptoChartVisual({ bare = false }: VisualProps) {
  const [candles, setCandles] = useState<BtcCandle[]>(BTC_SEED);
  const [price, setPrice] = useState(97240);
  const [slide, setSlide] = useState(0);
  const nextId = useRef(BTC_SEED.length);
  const priceRef = useRef(97240);

  useEffect(() => {
    let formStep = 0;
    let settleTimer: number | undefined;

    const id = window.setInterval(() => {
      formStep += 1;

      // Every second: lock the live candle and scroll in a new one
      if (formStep % 5 === 0) {
        setCandles((prev) => {
          const last = prev[prev.length - 1]!;
          const fresh = makeBtcCandle(last.close, nextId.current++);
          const deltaY = last.close - fresh.close;
          priceRef.current = Math.max(
            90000,
            Math.round(
              priceRef.current + deltaY * 42 + (Math.random() - 0.5) * 24,
            ),
          );
          return [...prev.slice(1), fresh];
        });
        setPrice(priceRef.current);
        // Instant offset cancels the index jump, then ease into place
        setSlide(24);
        window.clearTimeout(settleTimer);
        settleTimer = window.setTimeout(() => setSlide(0), 16);
        return;
      }

      // Between seconds: form the live candle so the body keeps ticking
      setCandles((prev) => {
        const next = prev.slice();
        const last = { ...next[next.length - 1]! };
        const nudge = (Math.random() - 0.62) * 10;
        const close = clampBtcY(last.close + nudge);
        last.close = close;
        last.up = close < last.open;
        last.high = Math.min(last.high, Math.min(last.open, close));
        last.low = Math.max(last.low, Math.max(last.open, close));
        next[next.length - 1] = last;
        priceRef.current = Math.max(
          90000,
          Math.round(priceRef.current - nudge * 18),
        );
        return next;
      });
      setPrice(priceRef.current);
    }, 200);

    return () => {
      window.clearInterval(id);
      window.clearTimeout(settleTimer);
    };
  }, []);

  // Bare (mobile): keep labels in a clear header row; chart sits below.
  const labelY = bare ? 11 : 16;
  const tickCy = bare ? 7 : 12;
  const chartTop = bare ? 26 : 40;
  const viewH = bare ? 130 : 150;
  const volumeBase = bare ? 126 : 146;
  const visible = candles.slice(-BTC_VISIBLE);

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
        <g
          className={slide === 0 ? "anim-btc-scroll" : undefined}
          strokeLinecap="round"
          style={{ transform: `translateX(${-slide}px)` }}
        >
          {visible.map((c, i) => {
            const x = 24 + i * 24;
            const bodyTop = Math.min(c.open, c.close);
            const bodyH = Math.max(5, Math.abs(c.close - c.open));
            const color = c.up ? "var(--brand-green)" : "var(--brand-teal)";
            const isLive = i === visible.length - 1;
            return (
              <g
                key={c.id}
                className={isLive ? "anim-btc-candle" : undefined}
              >
                <line
                  x1={x}
                  y1={c.high}
                  x2={x}
                  y2={c.low}
                  stroke={color}
                  strokeWidth="2"
                  strokeOpacity={c.up ? 1 : 0.5}
                />
                <rect
                  x={x - 7}
                  y={bodyTop}
                  width="14"
                  height={bodyH}
                  rx="2"
                  fill={color}
                  fillOpacity={c.up ? 1 : 0.4}
                />
              </g>
            );
          })}
        </g>
        <g
          className={slide === 0 ? "anim-btc-scroll" : undefined}
          fill="var(--brand-forest)"
          fillOpacity="0.55"
          style={{ transform: `translateX(${-slide}px)` }}
        >
          {visible.map((c, i) => (
            <rect
              key={`vol-${c.id}`}
              x={17 + i * 24}
              y={volumeBase - c.volume}
              width="14"
              height={c.volume}
              rx="1.5"
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
    <Panel tone="white" bare={bare}>
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
            fill="var(--brand-slate)"
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
              fill="var(--brand-mint)"
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
    <Panel tone="white" bare={bare}>
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
      strokeOpacity: 0.2,
      className: bare ? "anim-card-fan-0-once" : "anim-card-fan-0",
    },
    {
      fill: "var(--brand-teal)",
      ink: "var(--brand-white)",
      sub: "var(--brand-mint)",
      strokeOpacity: 0.2,
      className: bare ? "anim-card-fan-1-once" : "anim-card-fan-1",
    },
    {
      fill: "var(--brand-green)",
      ink: "var(--brand-forest)",
      sub: "var(--brand-forest)",
      strokeOpacity: 0.2,
      className: bare ? "anim-card-fan-2-once" : "anim-card-fan-2",
    },
    {
      // Front card — white surface so it reads clearly on the panel
      fill: "var(--brand-white)",
      ink: "var(--brand-forest)",
      sub: "var(--brand-teal)",
      strokeOpacity: 0.35,
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
            strokeOpacity={card.strokeOpacity}
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
