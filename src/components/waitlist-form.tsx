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
      className="mx-auto flex w-full max-w-[25.6rem] flex-col gap-3"
      noValidate
    >
      <div className="flex flex-col gap-2 rounded-full border border-field-border bg-field p-1 sm:flex-row sm:items-center sm:gap-0">
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
          disabled={pending}
          className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-2 text-sm text-field-ink outline-none placeholder:text-field-ink-faint disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-full bg-brand-white px-5 py-2 text-sm font-semibold text-brand-forest transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Joining…" : "Join the Waitlist"}
        </button>
      </div>
      <p className="text-center text-[14px] text-hero-ink-muted">
        First 1000 users get 8% cashback on all their card purchases
      </p>
      {state.status === "error" ? (
        <p className="text-center text-sm text-red-400" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
