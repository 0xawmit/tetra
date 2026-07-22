"use client";

import {
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  joinWaitlist,
  type WaitlistState,
} from "@/app/actions/waitlist";
import { siteLinks } from "@/lib/site";

const initialState: WaitlistState = {
  status: "idle",
  message: "",
};

function TelegramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function WaitlistModal({
  title,
  description,
  onClose,
  children,
}: {
  title: string;
  description?: string;
  onClose: () => void;
  children?: ReactNode;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    closeRef.current?.focus();
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        paddingTop: "max(1rem, env(safe-area-inset-top))",
        paddingRight: "max(1rem, env(safe-area-inset-right))",
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
        paddingLeft: "max(1rem, env(safe-area-inset-left))",
      }}
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-brand-forest/55 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(100%,100dvh-2rem)] w-full max-w-md flex-col overflow-y-auto overscroll-contain rounded-[1.25rem] bg-brand-white p-5 shadow-[0_24px_60px_rgba(11,53,43,0.28)] sm:max-h-[min(90dvh,40rem)] sm:rounded-[1.5rem] sm:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-brand-forest/55 transition-colors hover:bg-brand-mint hover:text-brand-forest sm:right-4 sm:top-4 sm:h-9 sm:w-9"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className="h-5 w-5 sm:h-4 sm:w-4"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <h2
          id={titleId}
          className="pr-12 font-display text-[1.25rem] font-semibold leading-snug tracking-tight text-brand-forest sm:pr-10 sm:text-2xl"
        >
          {title}
        </h2>

        {description ? (
          <p className="mt-3 text-[15px] leading-relaxed text-brand-forest/75 sm:mt-3 sm:text-base">
            {description}
          </p>
        ) : null}

        {children}
      </div>
    </div>,
    document.body,
  );
}

export function WaitlistForm({ id = "email" }: { id?: string }) {
  const [state, formAction, pending] = useActionState(
    joinWaitlist,
    initialState,
  );
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const canSubmit = email.trim().length > 0;

  useEffect(() => {
    if (pending) setDismissed(false);
  }, [pending]);

  const showSuccessModal = state.status === "success" && !dismissed;
  const showErrorModal =
    state.status === "error" &&
    state.errorType === "submission" &&
    !dismissed;

  if (state.status === "success") {
    return (
      <>
        {!showSuccessModal ? (
          <p
            className="animate-fade-up text-center text-base text-hero-ink-muted sm:text-lg"
            role="status"
            aria-live="polite"
          >
            You&apos;re on the list. We&apos;ll be in touch.
          </p>
        ) : null}
        {showSuccessModal ? (
          <WaitlistModal
            title="Thanks for joining our early-access waitlist."
            description="We'll email you when the beta is ready! In the meantime, join our Telegram community channel for regular updates."
            onClose={() => setDismissed(true)}
          >
            <a
              href={siteLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-brand-forest px-5 py-3.5 text-[17px] font-semibold text-brand-white transition-opacity hover:opacity-90 active:opacity-80 sm:mt-6 sm:min-h-0 sm:text-base"
            >
              <TelegramIcon className="h-5 w-5 shrink-0" />
              Join Telegram
            </a>
          </WaitlistModal>
        ) : null}
      </>
    );
  }

  return (
    <>
      <form
        action={formAction}
        className="mx-auto flex w-full max-w-none flex-col gap-2 sm:max-w-[25.6rem] sm:gap-3"
        noValidate
        onSubmit={(event) => {
          if (!canSubmit || pending) event.preventDefault();
        }}
      >
        <p className="px-1 text-center text-[13px] leading-snug text-brand-white sm:order-last sm:px-2 sm:text-[14px]">
          First 1000 users get product access and early perks,
          including 7% cashback on all card purchases.
        </p>

        {/* Mobile: separate email field + button. Desktop: combined pill. */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:border sm:border-field-border sm:bg-field sm:p-1">
          <label htmlFor={id} className="sr-only">
            Email address
          </label>
          <input
            id={id}
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            enterKeyHint="go"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={pending}
            className="h-[45px] min-w-0 w-full shrink-0 rounded-full border border-field-border bg-field px-5 text-center text-base text-field-ink outline-none placeholder:text-center placeholder:text-field-ink-faint focus:placeholder:text-transparent disabled:opacity-60 sm:h-auto sm:flex-1 sm:rounded-full sm:border-0 sm:bg-transparent sm:py-2 sm:text-left sm:text-sm sm:placeholder:text-left"
          />
          <button
            type="submit"
            disabled={!canSubmit || pending}
            className="h-[45px] w-full shrink-0 rounded-full bg-brand-white px-5 text-base font-semibold text-brand-forest transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45 sm:h-auto sm:w-auto sm:py-2 sm:text-sm"
          >
            {pending ? "Joining…" : "Join the Waitlist"}
          </button>
        </div>

        {state.status === "error" && state.errorType === "validation" ? (
          <p className="text-center text-sm text-red-400" role="alert">
            {state.message}
          </p>
        ) : null}
      </form>

      {showErrorModal ? (
        <WaitlistModal
          title="Email submission failed. Try again in a minute."
          onClose={() => setDismissed(true)}
        >
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-brand-forest px-5 py-3.5 text-[17px] font-semibold text-brand-white transition-opacity hover:opacity-90 active:opacity-80 sm:mt-6 sm:min-h-0 sm:text-base"
          >
            Try again
          </button>
        </WaitlistModal>
      ) : null}
    </>
  );
}
