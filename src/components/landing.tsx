import {
  HeroBackground,
  MobileHeroCard,
} from "@/components/hero-background";
import { Navbar } from "@/components/navbar";
import { WaitlistForm } from "@/components/waitlist-form";

export function Landing({ themeClass = "" }: { themeClass?: string }) {
  return (
    <div
      className={`flex h-dvh w-full min-w-0 flex-col gap-4 overflow-hidden bg-page-bg p-4 sm:gap-[25px] sm:p-[25px] ${themeClass}`}
    >
      <Navbar />

      <section className="relative flex min-h-0 w-full min-w-0 max-w-none flex-1 overflow-hidden rounded-[1.5rem] bg-hero-surface sm:rounded-[2rem]">
        <HeroBackground />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col justify-between px-6 pb-5 pt-14 text-center sm:items-center sm:justify-center sm:px-10 sm:py-16">
          <div className="flex shrink-0 flex-col items-center sm:flex-none">
            <p className="animate-fade-up mb-5 rounded-full bg-brand-slate px-3 py-1 text-xs text-hero-ink-muted sm:mb-6 sm:px-4 sm:text-sm">
              Invite-only. Launching soon. Join the waitlist to reserve a spot.
            </p>

            <h1 className="animate-fade-up font-display text-[54px] font-semibold leading-[1.05] tracking-tight text-hero-ink sm:text-5xl md:text-6xl lg:text-[84px]">
              One Account for
              <br />
              Everything Onchain
            </h1>

            <p className="animate-fade-up-delay-1 mt-2 max-w-[24rem] text-[18px] leading-snug text-brand-white sm:mt-5 sm:max-w-4xl sm:text-lg sm:leading-relaxed md:text-[24px]">
              Trade global markets, earn yield on idle balances, and spend your
              crypto anywhere in the world — all under one account.
            </p>
          </div>

          <div className="flex shrink-0 items-center justify-center py-1 sm:hidden">
            <MobileHeroCard />
          </div>

          <div className="animate-fade-up-delay-2 w-full shrink-0 sm:mt-10">
            <WaitlistForm id="hero-email" />
          </div>
        </div>
      </section>
    </div>
  );
}
