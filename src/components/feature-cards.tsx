"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  EarnVisual,
  PortfolioVisual,
  SpendVisual,
  TradeVisual,
} from "@/components/feature-visuals";

const CARD_WIDTH = 380;
const CARD_GAP = 20;
// How much of each stacked card peeks out to the right of the one above it.
const STACK_PEEK = 28;
// Scroll-progress window that drives the stack-to-row spread.
const SPREAD_START = 0.05;
const SPREAD_END = 0.8;

function CryptoTradeVisual() {
  return <TradeVisual symbols="BTC · ETH · SOL" dark />;
}

function StocksTradeVisual() {
  return <TradeVisual symbols="TSLA · NVDA · AAPL" />;
}

function DarkSpendVisual() {
  return <SpendVisual dark />;
}

const features = [
  {
    title: "Buy and trade crypto in an instant.",
    Visual: CryptoTradeVisual,
    card: "bg-brand-slate",
    titleClass: "text-brand-white",
  },
  {
    title: "Trade tokenized stocks in global markets.",
    Visual: StocksTradeVisual,
    card: "bg-card-green",
    titleClass: "text-card-green-ink",
  },
  {
    title: "Earn up to 12% APY on idle stablecoins.",
    Visual: EarnVisual,
    card: "bg-brand-white",
    titleClass: "text-brand-forest",
  },
  {
    title: "Spend your crypto anywhere in the world with Apple Pay, Google Pay, and Visa.",
    Visual: DarkSpendVisual,
    card: "bg-brand-forest",
    titleClass: "text-brand-white",
  },
  {
    title: "Your whole onchain activity, in one unified portfolio.",
    Visual: PortfolioVisual,
    card: "bg-card-green",
    titleClass: "text-card-green-ink",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

export function FeatureCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Once the cards fully disperse, keep them dispersed on upward scroll.
  const dispersedRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [stageWidth, setStageWidth] = useState(1200);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(media.matches);
    syncMotion();
    media.addEventListener("change", syncMotion);
    return () => media.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    const stage = scrollerRef.current;
    if (!stage) return;

    const syncWidth = () => setStageWidth(stage.clientWidth);
    syncWidth();

    const observer = new ResizeObserver(syncWidth);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      const traveled = clamp(-rect.top, 0, scrollable);
      const raw = traveled / scrollable;
      if (raw >= SPREAD_END) dispersedRef.current = true;
      setProgress(dispersedRef.current ? Math.max(raw, SPREAD_END) : raw);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  const count = features.length;
  const spread = reducedMotion
    ? 1
    : clamp((progress - SPREAD_START) / (SPREAD_END - SPREAD_START), 0, 1);
  const canScrollRow = spread > 0.98;

  const syncButtons = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    syncButtons();
    el.addEventListener("scroll", syncButtons, { passive: true });
    window.addEventListener("resize", syncButtons);
    return () => {
      el.removeEventListener("scroll", syncButtons);
      window.removeEventListener("resize", syncButtons);
    };
  }, [syncButtons]);

  // The mount-time sync can run before layout settles; refresh the button
  // state the moment the row actually becomes scrollable.
  useEffect(() => {
    if (canScrollRow) syncButtons();
  }, [canScrollRow, syncButtons]);

  const scrollByCard = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({
      left: direction * (CARD_WIDTH + CARD_GAP),
      behavior: "smooth",
    });
  };

  const rowWidth = count * CARD_WIDTH + (count - 1) * CARD_GAP;
  // Page shell already has 25px horizontal padding; keep a matching right buffer.
  const trackWidth = rowWidth + 25;
  // Front card left-aligned in the centered stack; cards behind peek right.
  const stackBaseX = stageWidth / 2 - (CARD_WIDTH + (count - 1) * STACK_PEEK) / 2;

  const arrowClass =
    "flex h-11 w-11 items-center justify-center rounded-full bg-page-heading text-page-bg transition hover:opacity-90 disabled:cursor-not-allowed disabled:border disabled:border-page-heading/25 disabled:bg-transparent disabled:text-page-heading/60";

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: reducedMotion ? "auto" : "190vh" }}
    >
      <div className="sticky top-0 flex h-dvh w-full flex-col justify-center py-8">
        <div className="flex shrink-0 items-end justify-between gap-6 pb-16">
          <h2 className="max-w-3xl text-left font-display text-[54px] font-semibold leading-[1.05] tracking-tight text-page-heading">
            One account for everything onchain
          </h2>
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              aria-label="Previous cards"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollRow || !canPrev}
              className={arrowClass}
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next cards"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollRow || !canNext}
              className={arrowClass}
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className={[
            "relative h-[53vh] w-full",
            canScrollRow
              ? "overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              : "overflow-hidden",
          ].join(" ")}
        >
          <div className="relative h-full" style={{ width: trackWidth }}>
            {features.map((feature, index) => {
              const Visual = feature.Visual;
              const rowX = index * (CARD_WIDTH + CARD_GAP);
              const stackedX = stackBaseX + index * STACK_PEEK;
              const x = reducedMotion ? rowX : lerp(stackedX, rowX, spread);

              return (
                <article
                  key={feature.title}
                  className="absolute inset-y-0"
                  style={{
                    width: CARD_WIDTH,
                    transform: `translate3d(${x}px, 0, 0)`,
                    zIndex: count - index,
                    willChange: reducedMotion ? undefined : "transform",
                  }}
                >
                  {/* Hover lift lives on an inner element so it doesn't
                      fight the scroll-driven transform above. */}
                  <div
                    className={`flex h-full flex-col overflow-hidden rounded-[1.75rem] ring-1 ring-brand-forest/10 transition-transform duration-200 ease-out hover:-translate-y-2 ${feature.card}`}
                  >
                    <h3
                      className={`px-7 pt-8 font-display text-[32px] font-semibold leading-snug tracking-tight ${feature.titleClass}`}
                    >
                      {feature.title}
                    </h3>

                    <div className="mt-8 flex min-h-0 flex-1 items-center justify-center px-6 pb-6">
                      <Visual />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
