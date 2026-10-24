"use client";

import { useEffect } from "react";
import { business } from "@/data/business";
import { messages, waLink } from "@/lib/whatsapp";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="mx-auto max-w-xl px-5 py-32 text-center">
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">Something went wrong</p>
      <h1 className="mt-4 font-display text-5xl font-extrabold uppercase leading-none">Page did not load</h1>
      <p className="mt-4 leading-relaxed text-neutral-600">
        Please try again. If it keeps happening, message us on WhatsApp or call {business.phones[0].display}.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="min-h-12 rounded-full bg-brand px-6 text-sm font-extrabold text-white">
          Try again
        </button>
        <a
          href={waLink(messages.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center rounded-full border-[1.5px] border-ink px-6 text-sm font-extrabold"
        >
          WhatsApp us
        </a>
      </div>
    </div>
  );
}
