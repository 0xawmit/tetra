/**
 * Vela brand palette — keep in sync with CSS variables in `globals.css`.
 * Use for JS/TS contexts (charts, canvas, emails). Prefer Tailwind
 * `brand-*` / semantic classes (`bg-surface`, `text-cta`) in components.
 */
export const brand = {
  mint: "#E5F9F1",
  white: "#FFFFFF",
  forest: "#0B352B",
  teal: "#32A184",
  green: "#5FC5A5",
  black: "#000000",
} as const;

export type BrandColor = keyof typeof brand;
