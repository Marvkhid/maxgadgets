"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { AnatomyLayer } from "@/data/guides";
import { cn } from "@/lib/cn";

const looks = [
  "from-neutral-900 to-neutral-700 border-neutral-500",
  "from-emerald-950 to-neutral-900 border-brand",
  "from-neutral-300 to-neutral-500 border-neutral-100",
  "from-neutral-600 to-ink border-neutral-400",
];

const decor: ReactNode[] = [
  <div key="d" className="mx-auto mt-4 h-5 w-16 rounded-full bg-black" />,
  <div key="b" className="grid grid-cols-3 gap-3 p-6">
    {Array.from({ length: 9 }, (_, i) => (
      <span key={i} className={cn("block h-9 rounded-md", i % 4 === 0 ? "bg-brand" : "bg-white/20")} />
    ))}
  </div>,
  <div key="t" className="m-6 h-[calc(100%-3rem)] rounded-2xl border-2 border-neutral-600 bg-neutral-400/60">
    <div className="mx-auto mt-6 h-2 w-16 rounded bg-brand" />
  </div>,
  <div key="k" className="m-4 grid h-20 w-20 grid-cols-2 place-items-center rounded-2xl bg-white/15 p-2">
    <i className="block h-7 w-7 rounded-full border-4 border-neutral-500 bg-black" />
    <i className="block h-7 w-7 rounded-full border-4 border-neutral-500 bg-black" />
    <i className="block h-7 w-7 rounded-full border-4 border-neutral-500 bg-black" />
  </div>,
];

export function ExplodedView({ layers }: { layers: AnatomyLayer[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [spread, setSpread] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSpread(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setSpread(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const gap = spread ? 74 : 6;

  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <div ref={ref} className="scene flex h-[460px] items-center justify-center" aria-hidden="true">
        <div
          className="preserve relative h-[340px] w-[170px] transition-transform duration-1000"
          style={{ transform: `rotateX(58deg) rotateZ(${spread ? -36 : -12}deg)` }}
        >
          {layers.map((layer, i) => (
            <div
              key={layer.name}
              className={cn(
                "absolute inset-0 rounded-[28px] border-2 bg-gradient-to-br shadow-2xl transition-all duration-700",
                looks[i % looks.length],
                active === i && "ring-4 ring-brand",
              )}
              style={{ transform: `translateZ(${(layers.length - 1 - i) * gap}px)` }}
            >
              {decor[i % decor.length]}
            </div>
          ))}
        </div>
      </div>
      <ol className="space-y-3">
        {layers.map((layer, i) => (
          <li
            key={layer.name}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className={cn(
              "rounded-2xl border p-5 transition",
              active === i ? "border-brand bg-brand/5" : "border-neutral-200",
            )}
          >
            <p className="font-display text-xl font-extrabold uppercase">
              <span className="mr-3 text-brand">0{i + 1}</span>
              {layer.name}
            </p>
            <p className="mt-2 leading-relaxed text-neutral-700">{layer.blurb}</p>
            {layer.fixes.length > 0 ? (
              <p className="mt-3 flex flex-wrap gap-2">
                {layer.fixes.map((fix) => (
                  <span key={fix} className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">
                    {fix}
                  </span>
                ))}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
