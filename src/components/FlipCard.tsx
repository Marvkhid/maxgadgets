"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface FlipCardProps {
  index: number;
  title: string;
  description: string;
  note: string;
  href: string;
}

export function FlipCard({ index, title, description, note, href }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="scene h-[270px]">
      <div
        className={cn(
          "preserve relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
          flipped && "flipped",
        )}
      >
        <button
          type="button"
          onClick={() => setFlipped(true)}
          aria-expanded={flipped}
          inert={flipped}
          className="face absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/20 bg-ink p-6 text-left text-white transition hover:border-brand"
        >
          <span className="flex w-full items-center justify-between text-xs font-extrabold tracking-[0.16em] text-brand">
            {number}
            <span aria-hidden="true" className="text-xl text-white">+</span>
          </span>
          <span className="font-display text-2xl font-extrabold uppercase leading-tight">{title}</span>
          <span className="text-xs text-white/60">Tap to read more</span>
        </button>
        <div
          inert={!flipped}
          className="face face-back absolute inset-0 flex flex-col justify-between rounded-2xl bg-brand p-6 text-white"
        >
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/80">{title}</p>
            <p className="mt-3 text-sm leading-relaxed">
              {description} {note}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center rounded-full bg-white px-4 text-xs font-extrabold text-ink"
            >
              Ask about this
            </a>
            <button
              type="button"
              onClick={() => setFlipped(false)}
              className="min-h-10 rounded-full border border-white/70 px-4 text-xs font-extrabold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
