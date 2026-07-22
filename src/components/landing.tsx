import { Navbar } from "@/components/navbar";
import { WaitlistForm } from "@/components/waitlist-form";

export function Landing({ themeClass = "" }: { themeClass?: string }) {
  return (
    <div
      className={`flex h-dvh flex-col gap-[25px] overflow-hidden bg-page-bg p-[25px] ${themeClass}`}
    >
      <Navbar />

      <section className="relative flex min-h-0 w-full flex-1 overflow-hidden rounded-[1.75rem] bg-hero-surface sm:rounded-[2rem]">
        <div
          aria-hidden="true"
          className="hero-glow pointer-events-none absolute -right-24 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-green)_22%,transparent)_0%,transparent_68%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-teal)_16%,transparent)_0%,transparent_70%)]"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 py-12 text-center sm:px-10 sm:py-16">
          <h1 className="animate-fade-up font-display text-[84px] font-semibold leading-[1.05] tracking-tight text-hero-ink">
            One Account for
            <br />
            Everything Onchain
          </h1>

          <p className="animate-fade-up-delay-1 mt-5 max-w-4xl text-[24px] leading-relaxed text-hero-ink-muted">
            Trade global markets, earn yield on idle balances, and spend your
            crypto anywhere in the world — all under one account.
          </p>

          <div className="animate-fade-up-delay-2 mt-10 w-full">
            <WaitlistForm id="hero-email" />
          </div>
        </div>
      </section>
    </div>
  );
}
