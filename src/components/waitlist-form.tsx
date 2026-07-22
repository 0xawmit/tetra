"use client";

import { useActionState } from "react";
import {
  joinWaitlist,
  type WaitlistState,
} from "@/app/actions/waitlist";

const initialState: WaitlistState = {
  status: "idle",
  message: "",
};

export function WaitlistForm({ id = "email" }: { id?: string }) {
  const [state, formAction, pending] = useActionState(
    joinWaitlist,
    initialState,
  );

  if (state.status === "success") {
    return (
      <p
        className="animate-fade-up text-center text-base text-hero-ink-muted sm:text-lg"
        role="status"
        aria-live="polite"
      >
        {state.message}
      </p>
    );
  }

  return (
    <form
      action={formAction}
      className="mx-auto flex w-full max-w-none flex-col gap-3 sm:max-w-[25.6rem]"
      noValidate
    >
      <div className="flex flex-col gap-2 rounded-[1.5rem] border border-field-border bg-field p-1.5 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-1">
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
          disabled={pending}
          className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-3 text-center text-base text-field-ink outline-none placeholder:text-center placeholder:text-field-ink-faint focus:placeholder:text-transparent disabled:opacity-60 sm:py-2 sm:text-left sm:text-sm sm:placeholder:text-left"
        />
        <button
          type="submit"
          disabled={pending}
          className="w-full shrink-0 rounded-full bg-brand-white px-5 py-3 text-base font-semibold text-brand-forest transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-2 sm:text-sm"
        >
          {pending ? "Joining…" : "Join the Waitlist"}
        </button>
      </div>
      <p className="px-2 text-center text-xs leading-snug text-brand-white sm:text-[14px]">
        First 1000 users get product access and early perks,
        including 7% cashback on all card purchases.
      </p>
      {state.status === "error" ? (
        <p className="text-center text-sm text-red-400" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
