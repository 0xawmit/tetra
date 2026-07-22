"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades content up into view the first time it reaches the middle band of
 * the viewport (see phantom.com section headings for the reference feel).
 */
export function Reveal({
  children,
  className = "",
  rootMargin = "-40% 0px -40% 0px",
}: {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
