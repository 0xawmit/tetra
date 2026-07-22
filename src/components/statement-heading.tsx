"use client";

import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/reveal";

// Where the merged Vela card lands, in px below the section center.
// Tuned together with the heading's upward shift so the heading + card
// group sits vertically centered (equal top/bottom margins) at rest.
const MERGE_Y = 137;

// The heading is shifted up by this much (see -translate-y-[104px] below);
// the scattered cards follow so they stay composed around the text.
const HEADING_SHIFT = 104;

const WALLET_CARDS = [
  {
    label: "Exchange",
    x: -440,
    y: -230,
    rotate: -10,
    className: "bg-card-mint text-card-mint-ink",
  },
  {
    label: "Broker",
    x: 440,
    y: -230,
    rotate: 8,
    className: "bg-brand-white text-brand-forest",
  },
  {
    label: "Cold wallet",
    x: -560,
    y: 10,
    rotate: 7,
    className: "bg-card-teal text-card-teal-ink",
  },
  {
    label: "DeFi",
    x: 560,
    y: 10,
    rotate: -6,
    className: "bg-card-green text-card-green-ink",
  },
  {
    label: "Savings",
    x: -330,
    y: 290,
    rotate: 6,
    className: "bg-brand-white text-brand-forest",
  },
  {
    label: "Card",
    x: 330,
    y: 290,
    rotate: -9,
    className: "bg-card-mint text-card-mint-ink",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export function StatementHeading() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [merge, setMerge] = useState(0);
  const [spreadScale, setSpreadScale] = useState(1);
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
      setMerge(1);
      return;
    }

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;

      // Progress through the pinned region drives the card merge.
      const scrollable = Math.max(rect.height - vh, 1);
      const traveled = clamp(-rect.top, 0, scrollable);
      const progress = traveled / scrollable;
      setMerge(clamp(progress / 0.7, 0, 1));

      setSpreadScale(clamp(window.innerWidth / 1440, 0.4, 1));
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

  // Eased travel keeps the convergence gentle at both ends.
  const travel = easeInOutCubic(merge);
  // Long, eased crossfade so the six cards melt into the Vela card.
  const blend = smoothstep(clamp((merge - 0.65) / 0.35, 0, 1));
  const scatterOpacity = 1 - blend;
  const velaIn = blend;

  return (
    <div ref={wrapperRef} className="relative h-[200vh]">
      <section className="sticky top-0 z-0 flex h-dvh w-full items-center justify-center overflow-hidden px-2 text-center sm:px-4">
        <div className="relative flex h-full w-full items-center justify-center">
          {WALLET_CARDS.map((card, index) => {
            const x = lerp(card.x * spreadScale, 0, travel);
            const y = lerp(card.y * spreadScale - HEADING_SHIFT, MERGE_Y, travel);
            const rotate = lerp(card.rotate, 0, travel);
            // Grow into the Vela card's footprint while fading, so the
            // crossfade reads as a morph instead of a swap.
            const scale = lerp(1, 1.28, blend);

            return (
              <div
                key={card.label}
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[7.5rem] w-[12.5rem]"
                style={{
                  transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`,
                  opacity: scatterOpacity,
                  zIndex: index,
                  willChange: reducedMotion ? undefined : "transform, opacity",
                }}
              >
                <div
                  className={`flex h-full w-full flex-col justify-between rounded-xl p-4 ring-1 ring-brand-forest/10 transition-transform duration-200 ease-out hover:-translate-y-1 ${card.className}`}
                >
                  <span
                    className="anim-pulse-soft h-2.5 w-2.5 rounded-full bg-current"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  />
                  <p className="text-left text-base font-semibold">
                    {card.label}
                  </p>
                </div>
              </div>
            );
          })}

          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-40 w-64"
            style={{
              transform: `translate(-50%, -50%) translate3d(0, ${MERGE_Y}px, 0) scale(${lerp(0.78, 1, velaIn)})`,
              opacity: velaIn,
              zIndex: 10,
              willChange: reducedMotion ? undefined : "transform, opacity",
            }}
          >
            <div className="flex h-full w-full flex-col justify-between rounded-2xl bg-card-green p-5 text-card-green-ink ring-1 ring-brand-forest/10 transition-transform duration-200 ease-out hover:-translate-y-1">
              <span className="anim-pulse-soft h-3 w-3 rounded-full bg-current" />
              <p className="text-left font-display text-2xl font-semibold tracking-tight">
                Vela
              </p>
            </div>
          </div>

          <div className="relative z-20 mx-auto max-w-3xl -translate-y-[104px]">
            <Reveal>
              <h2 className="font-display text-[72px] font-semibold leading-[1.05] tracking-tight text-page-heading">
                Your crypto should not make you juggle accounts.
              </h2>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
