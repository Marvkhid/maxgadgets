"use client";

import { useMemo, useState } from "react";
import { generationList, models, seriesList, type Series } from "@/data/models";
import { messages, waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { Reveal, Tilt } from "@/components/motion";
import { PhoneArt } from "@/components/PhoneArt";
import { ButtonLink } from "@/components/ui";

type SeriesFilter = Series | "All";
type GenerationFilter = number | "All";

export function ShopCatalogue() {
  const [query, setQuery] = useState("");
  const [series, setSeries] = useState<SeriesFilter>("All");
  const [generation, setGeneration] = useState<GenerationFilter>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return models.filter(
      (m) =>
        (series === "All" || m.series === series) &&
        (generation === "All" || m.generation === generation) &&
        (q === "" || m.name.toLowerCase().includes(q)),
    );
  }, [query, series, generation]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <label htmlFor="model-search" className="sr-only">
            Search by iPhone model
          </label>
          <input
            id="model-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by iPhone model, e.g. 16 Pro Max"
            className="min-h-12 w-full rounded-xl border-[1.5px] border-ink bg-white px-4 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15"
          />
        </div>
        <div>
          <label htmlFor="generation" className="sr-only">
            Filter by generation
          </label>
          <select
            id="generation"
            value={generation}
            onChange={(e) => setGeneration(e.target.value === "All" ? "All" : Number(e.target.value))}
            className="min-h-12 w-full rounded-xl border-[1.5px] border-ink bg-white px-4 text-sm md:w-48"
          >
            <option value="All">All generations</option>
            {generationList.map((g) => (
              <option key={g} value={g}>
                iPhone {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by series">
        {(["All", ...seriesList] as SeriesFilter[]).map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={series === s}
            onClick={() => setSeries(s)}
            className={cn(
              "min-h-11 rounded-full border-[1.5px] px-5 text-sm font-semibold transition",
              series === s ? "border-brand bg-brand text-white" : "border-neutral-300 hover:border-ink",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <h2 className="sr-only">iPhone models</h2>
      <p className="mt-4 text-xs text-neutral-500" aria-live="polite">
        Showing {results.length} of {models.length} models. Storage, colour and condition filters appear once the owner supplies that data.
      </p>

      {results.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-neutral-300 p-10 text-center">
          <p className="font-display text-2xl font-extrabold uppercase">No match in the list</p>
          <p className="mt-2 text-neutral-600">Ask us on WhatsApp. We may still be able to source it.</p>
          <ButtonLink href={waLink(messages.product(query.trim() || "iPhone"))} className="mt-6">
            Ask on WhatsApp
          </ButtonLink>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((m, i) => (
            <Reveal key={m.id} delay={(i % 3) * 90}>
              <Tilt>
                <article className="group rounded-3xl border border-neutral-200 bg-white p-5 transition-shadow hover:shadow-xl">
                  <div className="flex h-60 items-center justify-center rounded-2xl bg-neutral-50">
                    <PhoneArt
                      color={m.color}
                      lenses={m.lenses}
                      className="h-[190px] w-[94px] transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl font-extrabold uppercase leading-none">{m.name}</h3>
                      <p className="mt-2 text-xs text-neutral-500">
                        {m.year}
                        {m.storage ? ` · ${m.storage}` : ""}
                        {m.condition ? ` · ${m.condition}` : ""}
                      </p>
                    </div>
                    {m.condition === "UK-used" ? (
                      <span className="whitespace-nowrap text-[11px] font-extrabold text-brand">7-DAY WARRANTY</span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm text-neutral-600">Price and availability confirmed on WhatsApp.</p>
                  <ButtonLink href={waLink(messages.product(m.name))} className="mt-4 w-full">
                    Enquire on WhatsApp
                  </ButtonLink>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
