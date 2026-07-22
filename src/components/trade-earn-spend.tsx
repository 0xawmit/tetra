"use client";

import { useEffect, useRef, useState } from "react";

import {
  EarnVisual,
  SpendVisual,
  TradeVisual,
} from "@/components/feature-visuals";
import { Reveal } from "@/components/reveal";

function TradeCardVisual() {
  return <TradeVisual dark />;
}

function EarnCardVisual() {
  return <EarnVisual onGreen />;
}

function SpendCardVisual() {
  return <SpendVisual onTeal />;
}

const CARDS = [
  {
    title: "Trade",
    copy: "Crypto and tokenized stocks in global markets, all from one account.",
    Visual: TradeCardVisual,
    className: "bg-brand-forest text-brand-white",
    copyClass: "text-brand-white/70",
  },
  {
    title: "Earn",
    copy: "Up to 12% APY on idle stablecoins. No lockups, no juggling.",
    Visual: EarnCardVisual,
    className: "bg-card-green text-brand-slate",
    copyClass: "text-brand-slate/70",
  },
  {
    title: "Spend",
    copy: "Pay anywhere in the world with Apple Pay, Google Pay, and Visa.",
    Visual: SpendCardVisual,
    className: "bg-brand-teal text-brand-white",
    copyClass: "text-brand-white/75",
  },
];

// The first card slides in while the section itself scrolls into view,
// landing right as the heading reveals (so the heading is never alone
// over white space). The rest enter during the pinned scroll; values are
// pinned-scroll progress fractions.
const ENTER_STARTS = [0, 0.08, 0.48];
const ENTER_SPAN = 0.34;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function TradeEarnSpend() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  // How far the section has scrolled into the viewport (0..1, 1 = pinned).
  const [entry, setEntry] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(media.matches);
    syncMotion();
    media.addEventListener("change", syncMotion);
    return () => media.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      setEntry(1);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = Math.max(rect.height - vh, 1);
      setProgress(clamp(-rect.top / scrollable, 0, 1));
      setEntry(clamp((vh - rect.top) / vh, 0, 1));
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: reducedMotion ? "auto" : "220vh" }}
    >
      <div className="sticky top-0 flex h-dvh w-full flex-col justify-center py-10">
        <Reveal>
          <h2 className="max-w-4xl text-left font-display text-[54px] font-semibold leading-[1.05] tracking-tight text-page-heading">
            Trade, earn, and spend - without leaving your account.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {CARDS.map((card, index) => {
            const Visual = card.Visual;
            const enter = reducedMotion
              ? 1
              : index === 0
                ? // Rides the section's own entry into the viewport.
                  easeOutCubic(clamp((entry - 0.35) / 0.65, 0, 1))
                : easeOutCubic(
                    clamp((progress - ENTER_STARTS[index]) / ENTER_SPAN, 0, 1),
                  );

            return (
              <div
                key={card.title}
                style={{
                  // Cards start fully below the viewport and slide up into place.
                  transform: reducedMotion
                    ? undefined
                    : `translate3d(0, ${(1 - enter) * 90}vh, 0)`,
                  willChange: reducedMotion ? undefined : "transform",
                }}
              >
                {/* Hover lift lives on the article so it doesn't fight the
                    scroll-driven transform on the wrapper. */}
                <article
                  className={`flex h-full min-h-[26rem] flex-col rounded-[1.75rem] p-8 ring-1 ring-brand-forest/10 transition-transform duration-200 ease-out hover:-translate-y-2 ${card.className}`}
                >
                  <h3 className="font-display text-[32px] font-semibold tracking-tight">
                    {card.title}
                  </h3>
                  <div className="my-6 flex min-h-0 flex-1 items-center justify-center">
                    <div className="h-44 w-full">
                      <Visual />
                    </div>
                  </div>
                  <p className={`text-base leading-relaxed ${card.copyClass}`}>
                    {card.copy}
                  </p>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
