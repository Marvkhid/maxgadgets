import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal, Tilt } from "@/components/motion";
import { ButtonLink, Eyebrow, Heading, Section } from "@/components/ui";
import { journey, type JourneyIcon } from "@/data/journey";
import { findImage } from "@/lib/lifestyle";

const blue = "#1f4fd8";

function StepIcon({ icon }: { icon: JourneyIcon }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="0 0 48 48" width="72" height="72" aria-hidden="true" {...common}>
      {icon === "drop" && (
        <>
          <rect x="15" y="6" width="18" height="34" rx="4" />
          <path d="M24 14l-4 8 6 4-3 8" />
        </>
      )}
      {icon === "home" && (
        <>
          <path d="M6 22L24 7l18 15" />
          <path d="M11 20v20h26V20" />
          <circle cx="20" cy="28" r="1" />
          <circle cx="28" cy="28" r="1" />
          <path d="M20 34q4-3 8 0" />
        </>
      )}
      {icon === "laptop" && (
        <>
          <rect x="9" y="10" width="30" height="21" rx="2" />
          <path d="M4 37h40" />
        </>
      )}
      {icon === "shop" && (
        <>
          <path d="M6 18l4-10h28l4 10" />
          <path d="M6 18h36v4q-6 5-12 0-6 5-12 0-6 5-12 0z" />
          <path d="M10 26v14h28V26" />
        </>
      )}
      {icon === "counter" && (
        <>
          <path d="M6 30h36v12H6z" />
          <rect x="20" y="10" width="9" height="16" rx="2" />
        </>
      )}
      {icon === "scope" && (
        <>
          <path d="M18 6l8 4-4 10-8-4z" />
          <path d="M22 18q14 2 14 16" />
          <path d="M12 42h24" />
        </>
      )}
      {icon === "card" && (
        <>
          <rect x="6" y="12" width="36" height="24" rx="4" />
          <path d="M6 20h36" />
          <path d="M12 30h10" />
        </>
      )}
      {icon === "smile" && (
        <>
          <circle cx="24" cy="24" r="17" />
          <circle cx="18" cy="20" r="1" />
          <circle cx="30" cy="20" r="1" />
          <path d="M16 28q8 8 16 0" />
        </>
      )}
      {icon === "game" && (
        <>
          <rect x="5" y="16" width="38" height="18" rx="9" />
          <path d="M15 22v6M12 25h6" />
          <circle cx="31" cy="23" r="1.5" />
          <circle cx="36" cy="27" r="1.5" />
        </>
      )}
    </svg>
  );
}

export function RepairJourney() {
  return (
    <Section className="bg-gradient-to-b from-white via-[#f2f6ff] to-white">
      <Eyebrow>A repair story</Eyebrow>
      <Heading className="mt-3">
        From broken screen
        <br />
        to back to normal
      </Heading>
      <p className="mb-10 mt-4 max-w-xl leading-relaxed text-neutral-700">
        Follow David from the moment his screen breaks to the moment he is back to his games, with a fully restored phone.
      </p>

      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {journey.map((step, i) => {
          const src = findImage("journey", step.file);
          const barStyle: CSSProperties & Record<"--w", string> = {
            "--w": `${(step.n / journey.length) * 100}%`,
            background: `linear-gradient(90deg, #e5242a, ${blue})`,
          };
          return (
            <li key={step.n}>
              <Reveal delay={(i % 3) * 100} className="h-full">
                <Tilt className="h-full" max={6}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-neutral-200 transition-shadow duration-500 hover:shadow-2xl">
                    <div className="h-1.5 w-full bg-neutral-100" aria-hidden="true">
                      <div className="grow-bar h-full" style={barStyle} />
                    </div>
                    <div className="relative h-64 overflow-hidden">
                      {src ? (
                        <Image
                          src={src}
                          alt={step.alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                          style={{ objectPosition: step.position }}
                        />
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center text-white"
                          style={{ background: `linear-gradient(135deg, #e5242a, ${blue})` }}
                        >
                          <StepIcon icon={step.icon} />
                        </div>
                      )}
                      <span
                        className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand font-display text-xl font-extrabold text-white shadow-lg ring-4 ring-white"
                        aria-hidden="true"
                      >
                        {step.n}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em]" style={{ color: blue }}>
                        Step {step.n} of {journey.length}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-extrabold uppercase leading-none">{step.title}</h3>
                      <p className="mt-3 leading-relaxed text-neutral-700">{step.text}</p>
                    </div>
                  </article>
                </Tilt>
              </Reveal>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 text-center">
        <ButtonLink href="/repairs#repair-form" className="min-h-14 px-8 text-base">
          Broken Screen? Get Instant Fix Today!
        </ButtonLink>
      </div>
    </Section>
  );
}
